import { CommandRoute } from './command-route';

export class Device {
    constructor(
        public id:String,
        public name:String,
        public manufacturer:String,
        public mainRoute:String,
        public description:String,
        public dataIN:CommandRoute[],
        public dataOUT:CommandRoute[],
    
    ){

    }
}
