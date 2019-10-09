import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Device } from 'src/app/class/device';

@Component({
  selector: 'app-modal-device',
  templateUrl: './modal-device.component.html',
  styleUrls: ['./modal-device.component.css']
})
export class ModalDeviceComponent implements OnInit {

  constructor(public myDialogRef:MatDialogRef<ModalDeviceComponent>, @Inject(MAT_DIALOG_DATA) public device:Device) { }

  


  ngOnInit() {
  }

  onCancel(){
    this.myDialogRef.close(null)
    console.log(this.device)
  }
  
}
