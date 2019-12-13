# Smart-Sense
Sistema de monitoramento de dispositivos embarcados de forma universal.

# Instalação 

Para executar o sistema é necessário a instalação do nodejs, a versão utilizada neste projeto foi 
v10.17.0, porém versões mais recentes deverão funcionar. 

#https://nodejs.org/en/

Após a instalação verifique se o npm esta instalado pelo seguinte comando

# npm --v

Se estiver irá aparecer uma mensagem informando a versão, se não instale com o seguinte comando.

# sudo apt-get install npm

Atualize-o com o seguinte comando 

# npm install -g npm

Com o node e o npm instalado é necessário instalar o angular para executar o sistema web

# npm install -g @angular/cli@8.1.1

Para execudar o sistema web, entre na pasta webpage e execute os seguintes comandos

Somente na primeira vez
# npm install 

Para executar
# npm start

Para iniciar o servidor, entre na pasta server e execute os seguintes comandos

Somente na primeira vez
# npm install 

Para executar
# npm start

Algumas configurações de ip podem ser necessárias, estas ficam no arquivo /webpage/src/app.service.ts. 
Por padão o servidor foi definido no endereço: 

# http://localhost:3000

# Para a utilização da biblioteca do esp

Instale o módulo esp para o arduino, é necessário a versão mais recente do Arduino IDE

Acesse o menu Arquivo > Preferências. Na janela que abrir vá até a opção Adittional Boards Manager URL’s e insira a URL

# http://arduino.esp8266.com/stable/package_esp8266com_index.json. 
Em seguida clique no botão OK.
Agora acesse o menu Ferramentas > Placa e selecione a opção Boards Manager.
Na janela que abrir, role a barra de rolagem até encontrar o pacote “esp8266 by ESP8266 Community”. 
Clique no botão Install e aguarde a instalação finalizar. 
Com isso já aparecerá o Generic ESP8266 Modulo em ferramentas > placa.

Tuturial similar: https://blogmasterwalkershop.com.br/embarcados/nodemcu/nodemcu-configurando-a-ide-do-arduino/

O código depende da seguinte biblioteca

# ArduinoJson  v5.13.5

Esta pode ser instalada em Ferramentas > Gerenciador de Biblioteca

Com tudo instalado a unica alteração que deva ser feita no arquivo de configuração 
do esp para o dispositivo utilizado é na função:

```
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
```

Esta apresenta todas os comandos que o embarcado suporta, sendo que no dispositivo embarcado 
deve ser implementado de modo que ele suporte os comandos pela comunicação serial. 

O padrão da mensagem é composto pela chave e valor.

# key:val

Onde a chave será um comando informado na função initDevice, 
no código acima temos as chaves dos dados de entrada para o arduino e dos dados de saída do mesmo.

O comando que o servidor irá enviar para o esp será, por exemplo:

# setPoint:500

Este será enviado como um comando para o arduino.
O comando de requisição dos dados será:

# ldrValue:0
# ledPower:0

O esp coletará os dados dessa chave e enviará para o servidor.


