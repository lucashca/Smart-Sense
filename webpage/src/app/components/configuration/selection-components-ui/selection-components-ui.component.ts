import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentUI } from 'src/app/class/component-ui';
import { MatDialog } from '@angular/material';
import { ModalComponentUIComponent } from '../../modal/modal-component-ui/modal-component-ui.component';
import { Device } from 'src/app/class/device';

@Component({
  selector: 'app-selection-components-ui',
  templateUrl: './selection-components-ui.component.html',
  styleUrls: ['./selection-components-ui.component.css']
})
export class SelectionComponentsUIComponent implements OnInit {

  @Input() devices: Device[];
  @Input() components: ComponentUI[];

  @Output() componentsData = new EventEmitter<ComponentUI[]>();

  componentsUI = [
    { name: 'Real Time Chart', icon: '../../../assets/images/chart-icon.png', component: new ComponentUI('real-time-chart', "Real Time Chart", 1, 0) },
    { name: 'Action Button', icon: '../../../assets/images/button-icon.png', component: new ComponentUI('action-button', "Action Button", 0, 1) },
    { name: 'Table', icon: '../../../assets/images/table-icon.png', component: new ComponentUI('table', "Table", 10, 0) },
    { name: 'Data Field', icon: '../../../assets/images/data-field.png', component: new ComponentUI('data-field', "Data Field", 1, 0) },
    { name: 'Action Field', icon: '../../../assets/images/input-text.png', component: new ComponentUI('action-field', "Action Field", 1, 1) }
  ]



  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  setComponent(component: ComponentUI) {
    console.log(component)
    let c: ComponentUI = new ComponentUI(component.componentType, component.nameLabel, component.numberPortIN, component.numberPortOUT);
    this.components.push(c);
  }



  openDialog(id) {
    let dialogRef = this.dialog.open(ModalComponentUIComponent, {
      width: '35%',
      height: '55%',
      data: { component: this.components[id], devices: this.devices }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.components[id] = result;
        this.componentsData.emit(this.components);
        console.log("emitido");
      }
    });

  }



}
