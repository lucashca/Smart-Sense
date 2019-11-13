import express from 'express'
import cors from 'cors'
import request from 'request'

import { Device } from './class/device'
import { CommandRoute } from './class/command-route'
import { User } from './class/user'
import { ComponentUI } from './class/components-ui'
import { threadId } from 'worker_threads'


class App {
  public express: express.Application;

  private devices: Device[];
  private componentsUI: ComponentUI[];
  private layout: ComponentUI[];
  private cont: number;
  private sensor: number;
  private atuador: number;

  public constructor() {
    this.devices = []
    this.componentsUI = []
    this.layout = []
    this.cont = 0
    this.express = express()
    this.middlewares()
    this.routes()

  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.routeHelloWorld()
    this.routeGetDevices()
    this.routeLogin()
    this.routeSetComponents()
    this.routeGetComponents()
    this.routeSetLayout()
    this.routeGetLayout()
    this.routeSendCommand()
    this.routeGetData()
  }

  private routeHelloWorld(): void {
    this.express.get('/', (req, res) => {
      return res.send('Hello World')
    })
  }

  private routeGetDevices(): void {
    this.express.get('/getDevices', (req, res) => {
      return res.send(JSON.stringify(this.devices))
    })
  }

  private routeLogin(): void {
    this.express.post('/login', (req, res) => {
      const user: User = req.body
      if (user.name === 'lucas') {
        if (user.password === 'senha') {
          console.log('login')
          return res.status(200).send(true).end()
        }
        return res.status(500).send('Wrong password').end()
      }
      return res.status(500).send('Wrong user').end()
    })
  }

  private routeSetComponents(): void {
    this.express.post('/setComponents', (req, res) => {
      this.componentsUI = req.body
      console.log(this.componentsUI)
      res.status(200).end()
    })
  }

  private routeGetComponents(): void {
    this.express.get('/getComponents', (req, res) => {
      res.send(this.componentsUI)
    })
  }

  private routeSetLayout(): void {
    this.express.post('/setLayout', (req, res) => {
      this.layout = req.body
      console.log(this.layout)
      res.status(200).end()
    })
  }

  private routeGetLayout(): void {
    this.express.get('/getLayout', (req, res) => {
      res.send(this.layout)
    })
  }

  private routeSendCommand(): void {
    this.express.post('/sendCommand', (req, res) => {
      console.log(req.body)
      let route = "http://" + req.body.device.mainRoute + "/sendCmd?cmd=" + req.body.command.dataPath + ":" + req.body.data;
      this.requestSendComand(route, res)
    })
  }

  private routeGetData(): void {
    this.express.post('/getData', (req, res) => {
      this.cont++
      let route = "http://" + req.body.device.mainRoute + "/getData?data=" + req.body.command.dataPath;
      this.requestDeviceData(route, res);

    })
  }

  public requestDeviceInfo(ip) {
    request(ip + "/getDeviceInfo", { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

      let dataIn = body.dataIn;
      let dataOut = body.dataOut;
      dataIn = dataIn.slice(1, -1).split(',')
      dataOut = dataOut.slice(1, -1).split(',')

      let dIn: CommandRoute[] = []
      let dOut: CommandRoute[] = []

      for (let d of dataIn) {
        dIn.push(new CommandRoute(d, d, true))
      }
      for (let d of dataOut) {
        dOut.push(new CommandRoute(d, d, true))
      }

      let d = new Device(body.id, body.name, body.manufacturer, body.route, "", dIn, dOut)
      this.devices.push(d)

    });
  }

  public requestDeviceData(route: string, resOriginal) {
    request(route, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

      //console.log("Client:" + route + " Response:" + body)
      resOriginal.send('' + body)
    });
  }
  public requestSendComand(route, resOriginal) {
    request(route, { json: true }, (error, res, body) => {
      if (error) { return console.error(error) }
      console.log("Client:" + route + " Response:" + body)
      resOriginal.send(200)
    })
  }

  public resolveAfterXMiliSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, x);
    });
  }

  public async monitorData(x) {
    while (true) {
      await this.resolveAfterXMiliSeconds(x);

    }
  }


}

export default new App()
