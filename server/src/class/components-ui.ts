import { CommandRoute } from './command-route'
import { Device } from './device'

export class ComponentUI {
    public componentType: string
    public nameLabel: string
    public numberPortIN: number
    public numberPortOUT: number
    public device: Device
    public dataIN: CommandRoute[]
    public dataOUT: CommandRoute[]
    public description: string
    public valid: boolean

    constructor (
      componentType: string,
      nameLabel: string,
      numberPortIN: number,
      numberPortOUT: number,
      device?: Device,
      dataIN?: CommandRoute[],
      dataOUT?: CommandRoute[],
      description?: string,
      valid?: boolean
    ) {
      this.componentType = componentType
      this.nameLabel = nameLabel
      this.numberPortIN = numberPortIN
      this.numberPortOUT = numberPortOUT
      this.device = device
      this.dataIN = dataIN
      this.dataOUT = dataOUT
      this.description = description
      this.valid = valid
    }
}
