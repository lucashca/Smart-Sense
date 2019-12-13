#define switchPin 8 // Analogico 0

String mode1 = "automatic";
String mode2 = "switch";

String mode = mode1;

int switchStatus = LOW;


int delayTime = 5000;

void setup() {
  pinMode(switchPin,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println(".");
  verificaEntrada(); 
  delay(500); 
}

void switchMode(){
    Serial.println("Ligando");
    switchStatus = ~switchStatus;
    digitalWrite(switchPin,switchStatus);
    Serial.println("Desligando");
}

void automaticMode(){
    Serial.println("Ligando");
    digitalWrite(switchPin,HIGH);
    delay(delayTime);
    Serial.println("Desligando");
    
    digitalWrite(switchPin,LOW);   
    
}

void verificaEntrada(){
  if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        String var = getValue(cmd,':',0);
        String value = getValue(cmd,':',1);
        if(var.equals("setdelaytime")){
          delayTime = value.toInt();
        }   
        if(var.equals("setmode")){
          if(value.equals("switch")){
            mode = mode2;
          }
          else if(value.equals("automatic")){
            mode = mode1;
          }      
        }
        if(var.equals("switch")){
          if(mode.equals(mode1)){
            automaticMode(); 
          }
          else if(mode.equals(mode2)){
            switchMode();
          }
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
