
int ledPin = 8; //Led no pino 7

int ldrPin = 7; //LDR no pino analígico 8

int ldrValor = 0;

int setPoint = 500;

int ledPower = 0;

int counter = 0;
int amostras = 5;

double variacao = 0.01;

int getLedPower(int sensorValue,int ledPowerValue, int setPoitValue);
String getValue(String data, char separator, int index);

float StrToFloat(String str);

String cmd ="";


void setup() {
 pinMode(ledPin,OUTPUT); //define a porta 7 como saída
 Serial.begin(9600); //Inicia a comunicação serial
 
 ldrValor = analogRead(ldrPin);
}
 
void loop() {
 ///ler o valor do LDR
 ldrValor = ldrValor + analogRead(ldrPin); //O valor lido será entre 0 e 1023
 
  counter = counter + 1;
 
 if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        String var = getValue(cmd,':',0);
        String value = getValue(cmd,':',1);
        
        if(var.equals("amostras")){
          
          amostras = value.toInt();
          counter = 1;
        }
        if(var.equals("variacao")){
          char floatbuf[32]; // make this at least big enough for the whole string
          value.toCharArray(floatbuf, sizeof(floatbuf));
          variacao = atof(floatbuf);
         

        }
        if(var.equals("setPoint")){
          char floatbuf[32]; // make this at least big enough for the whole string
          value.toCharArray(floatbuf, sizeof(floatbuf));
          setPoint = (double)atof(floatbuf);
         
        }        
    }
 if(counter%amostras == 0){
   ldrValor = ldrValor/amostras;
   
 

  ledPower = getLedPower(ldrValor,ledPower,setPoint,variacao);
  
  
  analogWrite(ledPin, ledPower);         
  /*
  float percentLed_qc = (float)(ledPower_qc)*100/255;
  float percentLed_qs = (float)(ledPower_qs)*100/255;
  float percentLed_co = (float)(ledPower_co)*100/255;
  float percentLed_sl = (float)(ledPower_sl)*100/255;
  */
  float percentLed = (float)(ledPower);
   
 /*    
 Serial.print("setPoint_qs:");
 Serial.println(setPoint_qs);
 
 Serial.print("ldrValor_qs:");
 Serial.println(ldrValor_qs);
 
 Serial.print("ledPower_qs:");
 Serial.println(percentLed_qs);
 
 */
 
  
  

 Serial.print("setPoint:");
 Serial.println(setPoint);
  
 Serial.print("ldrValue:");
 Serial.println(ldrValor);
 
 Serial.print("ledPower:");
 Serial.println(percentLed);
 
   ldrValor = 0;
  
 } 
 //imprime o valor lido do LDR no monitor serial
 /*
 Serial.print("\nQC - Ldr: ");
 Serial.print(ldrValor_qc);
 Serial.print(" Led: ");
 Serial.print(ledPower_qc);
 Serial.print(" QS - Ldr: ");
 Serial.print(ldrValor_qs);
 Serial.print(" Led: ");
 Serial.print(ledPower_qs);
 Serial.print(" CO - Ldr: ");
 Serial.print(ldrValor_co);
 Serial.print(" Led: ");
 Serial.print(ledPower_co);
 Serial.print(" SL - Ldr: ");
 Serial.print(ldrValor_sl);
 Serial.print(" Led: ");
 
 Serial.print(ledPower_sl);
 */
 delay(5);
}

float StrToFloat(String str)
{
     char carray[str.length() + 1]; 

     str.toCharArray(carray, sizeof(carray));

    return atof(carray);
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

int getLedPower(int sensorValue, int ledPowerValue, int setPoitValue,float taxa){
  float maximum = 1 + taxa;
  float minimum = 1 - taxa;
 
  int maxLedPower = 255;
  int minLedPower = 0;
  int maxPoint = setPoitValue*maximum;
  int minPoint = setPoitValue*minimum;
  int dif = sensorValue - setPoitValue;
  
   int ledIncrement = 1;
  if(dif < 0){
    dif = dif*(-1);
  }
   
  if(dif < 1024){
    ledIncrement = 30;
  }
  if(dif < 500){
    ledIncrement = 15;
  }  
  if(dif < 300){
    ledIncrement = 10;
  }  
  if(dif < 100){
    ledIncrement = 5;
  }  
  if(dif < 40){
    ledIncrement = 1;
  }  
  
    /*
 Serial.print("dif:");
 Serial.print(dif);
 Serial.print(" = ");
 Serial.print(sensorValue);
 Serial.print(" - ");
 Serial.println(setPoitValue);

 
 Serial.print("ledIncrement:");
 Serial.println(ledIncrement);
 */
 
  if (sensorValue > maxPoint ){    
    ledPowerValue = ledPowerValue + ledIncrement;
    if(ledPowerValue > maxLedPower){
      ledPowerValue = maxLedPower;
    } 
  }
  if (sensorValue < minPoint){
     ledPowerValue = ledPowerValue - ledIncrement;
     if(ledPowerValue < minLedPower){
       ledPowerValue = minLedPower;
     }
  }
  return ledPowerValue;
  
}
