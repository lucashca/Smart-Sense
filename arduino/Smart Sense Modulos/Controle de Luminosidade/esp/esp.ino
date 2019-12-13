#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>


#ifndef STASSID
#define STASSID "Lucas"
#define STAPSK  "123456789"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

String getValue(String data, char separator, int index);
void initDevice(const IPAddress& ipAddress);
void handleNotFound();
void getDeviceInfo();
void sendCmd();
void readData();
void handlerGetData();




ESP8266WebServer server(80);

struct Device
{
String nome;
String id;
String manufacturer;
String route;
String dataIn[10];
String dataOut[10];
int dataInSize;
int dataOutSize;
};

struct Device d;




IPAddress ip(192, 168, 43, 10); // where xx is the desired IP Address
IPAddress gateway(192, 168, 43, 1); // set gateway to match your network
IPAddress subnet(255, 255, 255, 0); // set subnet mask to match your network 
void setup(void) {
  initDevice(ip);
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.config(ip,gateway,subnet);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    String msg = "Aguardando conexão com";
    Serial.println(msg);
  }
  Serial.println(WiFi.localIP());
  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);
  server.on("/sendCmd",sendCmd);
  server.on("/getDeviceInfo", getDeviceInfo);
  server.on("/getData",handlerGetData);
  


  server.onNotFound(handleNotFound);

  server.begin();
}

void loop(void) {
  server.handleClient();
  MDNS.update();
}

void initDevice(const IPAddress& ipAddress){
  String ip = String(ipAddress[0]) + String(".") +String(ipAddress[1]) + String(".") +String(ipAddress[2]) + String(".") + String(ipAddress[3])  ;
  d.nome = "SmartLume";
  d.id = "1";
  d.manufacturer = "Arduino Device";
  d.route = ip;  
  d.dataIn[0] = "setPoint";
  d.dataOut[0] = "ledPower";
  d.dataOut[1] = "ldrValue";
  d.dataOut[2] = "setPoint";    
  d.dataInSize = 1;
  d.dataOutSize = 3;
}




void handlerGetData(){
   if (server.hasArg("data")== false){ //Check if body received
            server.send(200, "text/plain", "Body not received");
            return;
  }
  String data = server.arg("data");
  readData(data);
  
}
void readData(String data){
  int cont =0;
  for (cont = 0; cont < 10; cont++){
   
    if (Serial.available()) {
      String cmd = Serial.readStringUntil('\n');
      String var = getValue(cmd,':',0);
      String value = getValue(cmd,':',1);
      if(var.equals(data)){
        char floatbuf[32]; // make this at least big enough for the whole string
        value.toCharArray(floatbuf, sizeof(floatbuf));
        double res = atof(floatbuf);
        String msg =(String) res;
        server.send(200, "text/plain", msg);
        return;
      }
    }
  }
 
  server.send(404, "text/plain", "Data not found!");
}

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
  
  int i =0;
  String arrIn = "[";
  for( i=0; i < d.dataInSize; i++){
    String data = d.dataIn[i];
    if (i>0){
      arrIn+=",";
    }
    arrIn+=data;
  }
  arrIn+="]";
  
  String arrOut = "[";
  for( i=0; i < d.dataOutSize; i++){
    String data = d.dataOut[i];
    if (i>0){
      arrOut+=",";
    }
    arrOut+=data;
    Serial.println(arrOut);
 
  }
  arrOut+="]";

  
  device["dataIn"] = arrIn;
  device["dataOut"] = arrOut;
 
  String jsonChar;
  device.printTo(jsonChar);
  server.send(200, "application/json", jsonChar);
  
}

void handleNotFound() {
  server.send(404, "text/plain", "Page not found!");
}

void sendCmd(){
  if (server.hasArg("cmd")== false){ //Check if body received
            server.send(200, "text/plain", "Body not received");
            return;
      }
  String cmd = server.arg("cmd");
  Serial.println(cmd);
  server.send(200, "text/plain", "OK");
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
