import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentUI } from 'src/app/class/component-ui';
import { Device } from 'src/app/class/device';
import { FormControl } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { CommandRoute } from 'src/app/class/command-route';

@Component({
  selector: 'app-modal-component-ui',
  templateUrl: './modal-component-ui.component.html',
  styleUrls: ['./modal-component-ui.component.css']
})
export class ModalComponentUIComponent implements OnInit {


  devicesForm = new FormControl();
  componentsUI:ComponentUI;
  devices:Device[];
  
  numberOfPortsIN = [];
  numberOfPortsOUT = [];
  
  
  constructor(public myDialogRef:MatDialogRef<ModalComponentUIComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.componentsUI = data.component;
    this.devices = data.devices;

    this.numberOfPortsIN = Array(this.componentsUI.numberPortIN).fill(0).map((x,i)=>i); // [0,1,2,3,4]
    this.numberOfPortsOUT = Array(this.componentsUI.numberPortOUT).fill(0).map((x,i)=>i); // [0,1,2,3,4]
   

    if(!this.componentsUI.dataIN){
      this.componentsUI.dataIN = Array(this.componentsUI.numberPortIN).fill(0).map((x,i)=>new CommandRoute('','',false));
    }
    if(!this.componentsUI.dataOUT){
      this.componentsUI.dataOUT = Array(this.componentsUI.numberPortOUT).fill(0).map((x,i)=>new CommandRoute('','',false));
    }
    

    console.log(this.numberOfPortsIN);
    console.log(this.numberOfPortsOUT);
    

    console.log(this.devices);
    console.log(this.componentsUI);
    
   } 

  


  ngOnInit() {
  }

  onSelectionDeviceChange(){
    console.log(this.devicesForm);
    this.componentsUI.device = this.devicesForm.value;
  }

  onCancel(){
    this.myDialogRef.close(null)
    console.log(this.componentsUI)
  }

  onConfirm(){
    this.componentsUI.valid = true;
    this.myDialogRef.close(this.componentsUI);
  }

  

}
