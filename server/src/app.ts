import express from 'express'
import cors from 'cors'
import { Device } from './class/device'
import { CommandRoute } from './class/command-route'
import { User } from './class/user'
import { ComponentUI } from './class/components-ui'

class App {
    public express: express.Application;

    private devices: Device[];
    private componentsUI: ComponentUI[];
    private layout: ComponentUI[];
    private cont: number;
    public constructor () {
      this.devices = []
      this.componentsUI = []
      this.layout = []
      this.cont = 0
      this.devices.push(new Device('id - 1', 'Arduino 1', 'Arduino', 'rota 1', 'Sistema de controle de luminosidade', [new CommandRoute('setPoint', '/setPoint', true)], [new CommandRoute('sensor', '/sensor', true), new CommandRoute('atuador', '/atuador', true)]))
      this.devices.push(new Device('id - 2', 'Arduino 2', 'Arduino', 'rota 2', 'Sistema de controle de luminosidade', [new CommandRoute('setPoint', '/setPoint', true)], [new CommandRoute('sensor', '/sensor', true), new CommandRoute('atuador', '/atuador', true)]))
      this.devices.push(new Device('id - 3', 'Arduino 3', 'Arduino', 'rota 3', 'Sensor de Temperatura', [], [new CommandRoute('sensor', '/sensor', true)]))
      this.devices.push(new Device('id - 4', 'Arduino 4', 'Arduino', 'rota 4', 'Controle da Trava elétrica', [new CommandRoute('open', '/open', true)], []))

      this.express = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
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

    private routeHelloWorld (): void {
      this.express.get('/', (req, res) => {
        return res.send('Hello World')
      })
    }

    private routeGetDevices (): void {
      this.express.get('/getDevices', (req, res) => {
        return res.send(JSON.stringify(this.devices))
      })
    }

    private routeLogin (): void {
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

    private routeSetComponents (): void {
      this.express.post('/setComponents', (req, res) => {
        this.componentsUI = req.body
        console.log(this.componentsUI)
        res.status(200).end()
      })
    }

    private routeGetComponents (): void {
      this.express.get('/getComponents', (req, res) => {
        res.send(this.componentsUI)
      })
    }

    private routeSetLayout (): void {
      this.express.post('/setLayout', (req, res) => {
        this.layout = req.body
        console.log(this.layout)
        res.status(200).end()
      })
    }

    private routeGetLayout (): void {
      this.express.get('/getLayout', (req, res) => {
        res.send(this.layout)
      })
    }

    private routeSendCommand (): void {
      this.express.post('/sendCommand', (req, res) => {
        console.log(req.body)
      })
    }

    private routeGetData (): void {
      this.express.post('/getData', (req, res) => {
        this.cont++
        res.send('' + this.cont)
      })
    }
}

export default new App().express
