import { CommandRoute } from './command-route'

export class Device {
    public id:string
    public name:string
    public manufacturer:string
    public mainRoute:string
    public description:string
    public dataIN:CommandRoute[]
    public dataOUT:CommandRoute[]
    public constructor (
      id:string,
      name:string,
      manufacturer:string,
      mainRoute:string,
      description:string,
      dataIN:CommandRoute[],
      dataOUT:CommandRoute[]

    ) {
      this.id = id
      this.name = name
      this.manufacturer = manufacturer
      this.mainRoute = mainRoute
      this.description = description
      this.dataIN = dataIN
      this.dataOUT = dataOUT
    }
}
