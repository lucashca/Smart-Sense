export class CommandRoute {
    public dataID:string
    public dataPath:string
    public valid:boolean
    public constructor (
      dataID:string,
      dataPath:string,
      valid:boolean
    ) {
      this.dataID = dataID
      this.dataPath = dataPath
      this.valid = valid
    }
}
