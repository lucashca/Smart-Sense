#include <Thermistor.h>

#define termistorPin 0 // Analogico 0
int offSet = 86; // Offset da temperatura em celsius

Thermistor temp(termistorPin); 

void setup() {
  Serial.begin(9600);
}
void loop() {

int cont = 0;
int amostragem = 20;

float temperature = 0;
for (cont = 0; cont < amostragem; cont++){
  float tempe = temp.getTemp();
  temperature = temperature + tempe + offSet;
  delay(25); 
}

temperature = temperature/amostragem;


Serial.print("temperatura:");
Serial.println(temperature);
verificaEntrada();

}

void verificaEntrada(){
  if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        String var = getValue(cmd,':',0);
        String value = getValue(cmd,':',1);   
        if(var.equals("addoffset")){
          offSet = offSet + value.toInt();
        }
        if(var.equals("zeraoffset")){
          offSet = 0;
        }
    }
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
