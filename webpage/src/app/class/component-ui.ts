import { CommandRoute } from "./command-route";
import { Device } from "./device";

export class ComponentUI {
  constructor(
    public componentType: string,
    public nameLabel: string,
    public numberPortIN: number,
    public numberPortOUT: number,
    public device?: Device,
    public dataIN?: CommandRoute[],
    public dataOUT?: CommandRoute[],
    public description?: string,
    public valid?: boolean
  ) {}
}
