#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>


#ifndef STASSID
#define STASSID "Valesig"
#define STAPSK  "verilu141094"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;




struct Device
{
String nome;
String id;
String manufacturer;
String route;
String dataIn[10];
String dataOut[10];
};

struct Device d;

void initDevice(){
  d.nome = "Arduino Test";
  d.id = "1";
  d.manufacturer = "Arduino Device";
  d.route = "ip";  
  d.dataIn[0] = "setPoint";
  d.dataOut[0] = "sensor";
  d.dataOut[1] = "atuador";  
}

ESP8266WebServer server(80);

void handleRoot() {
  server.send(200, "text/plain", "hello from esp8266!");
}

void getDeviceInfo(){
  
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& device = jsonBuffer.createObject();
  

  device["name"] = d.nome;
  device["id"] = d.id;
  device["manufacturer"] = d.manufacturer;
  device["route"] = d.route;
  device["dataIn"] = d.dataIn;
  device["dataOut"] = d.dataOut;
  
  String jsonChar;
  device.printTo(jsonChar);
  server.send(200, "application/json", jsonChar);

  
  
}


void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}

void setup(void) {
  initDevice();
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
 

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    String msg = "Aguardando conexão com %s",ssd;
    Serial.println(msg);
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);
  
  server.on("/getDeviceInfo", getDeviceInfo);


  server.on("/inline", []() {
    server.send(200, "text/plain", "this works as well");
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  MDNS.update();
}
