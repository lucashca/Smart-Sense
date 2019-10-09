import { Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Device } from 'src/app/class/device';
import { MatDialog } from '@angular/material';
import { ModalDeviceComponent } from '../../modal/modal-device/modal-device.component';

@Component({
  selector: 'app-select-devices',
  templateUrl: './select-devices.component.html',
  styleUrls: ['./select-devices.component.css']
})
export class SelectDevicesComponent  {

  devicesForm = new FormControl();
  @Input() devices:Device[];


  constructor(public dialog:MatDialog) { }


  openDialog(id){
    let dialogRef = this.dialog.open(ModalDeviceComponent,{
      width:'35%',
      height:'55%',
      data:this.devices[id],
    });
    dialogRef.afterClosed().subscribe(result =>{});
    
  }

  


}
