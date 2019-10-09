import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "src/app/app.service";
import { ComponentUI } from "src/app/class/component-ui";

@Component({
  selector: 'app-action-field',
  templateUrl: './action-field.component.html',
  styleUrls: ['./action-field.component.css']
})
export class ActionFieldComponent implements OnInit {

  constructor(private appServices: AppService) { }

  @Input() component: ComponentUI;

  data: any;

  ngOnInit() {
    console.log(this.component)
  }


  sendCommand() {
    console.log("Entrou")
    this.appServices.sendCommandToDevice(this.component.device, this.component.dataOUT[0], this.data).subscribe(
    );
  }

}
