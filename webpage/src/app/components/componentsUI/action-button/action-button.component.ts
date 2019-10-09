import { Component, OnInit, Input } from '@angular/core';
import { ComponentUI } from "src/app/class/component-ui";
import { AppService } from "src/app/app.service";



@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {

  @Input() component: ComponentUI;


  data: String;

  constructor(private appServices: AppService) { }



  ngOnInit() {
    console.log(this.component);
  }

  sendAction() {
    console.log(this.component.device);
    console.log(this.component.dataOUT[0]);

    this.appServices.sendCommandToDevice(this.component.device, this.component.dataOUT[0]).subscribe((res) => {
      console.log(res);
    })
  }

}
