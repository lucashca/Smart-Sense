import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Device } from 'src/app/class/device';
import { CommandRoute } from 'src/app/class/command-route';
import { ComponentUI } from 'src/app/class/component-ui';
import { ConfigurationService } from "./configuration.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {



  @ViewChild('tabGroup',null) tabGroup;

  devices:Device[];
  components:ComponentUI[];
  layoutPile:ComponentUI[];
  constructor(public configurationService:ConfigurationService) { }

  ngOnInit() {
  this.devices= []
  this.components = [];
  this.layoutPile = [];
    this.getDevices();
    this.getComponents();
    this.getLayout();
  }



  printTab(){
    console.log(this.tabGroup._selectedIndex);
  }

  setComponent(c){
    this.components = c;
    console.log(c);
  }

  getDevices(){
    this.configurationService.getDevices().subscribe((data:Device[])=>{
      console.log("Data retornou")
      console.log(data);
      this.devices = data;
    })
  }

  setComponents(){
    this.configurationService.setComponents(this.components).subscribe((res)=>{
      console.log(res);
    });
  }
  getComponents(){
    this.configurationService.getComponents().subscribe((data:ComponentUI[])=>{
      console.log("components");
      console.log(data);
      this.components = data;    });

  }

  setLayout(){
    this.configurationService.setLayout(this.layoutPile).subscribe((res)=>{console.log(res)})
  }
  getLayout(){
    this.configurationService.getLayout().subscribe((data:ComponentUI[])=>{
      this.layoutPile = data;
    })
  }
  

}
