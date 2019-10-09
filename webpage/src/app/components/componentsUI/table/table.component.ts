import { Component, OnInit, Input } from '@angular/core';
import { ComponentUI } from "src/app/class/component-ui";
import { AppService } from "src/app/app.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() component: ComponentUI;
  data: String[];
  constructor(private appServices: AppService) { }

  ngOnInit() {
    this.data = [];
    console.log(this.component);
    this.createData();
    this.monitor();
  }

  createData() {
    for (let d of this.component.dataIN) {
      if (d.valid) {
        this.data.push('a');
      }
    }
  }


  async monitor() {
    while (true) {
      await this.resolveAfterXMileSecondes(500);
      for (let i in this.component.dataIN) {
        let d = this.component.dataIN[i];
        if (d.valid) {
          this.getData(i);
        }
      }
    }
  }

  resolveAfterXMileSecondes(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, x)
    })
  }

  getData(index) {
    this.appServices.getData(this.component.device, this.component.dataIN[index]).subscribe((res) => {
      this.data[index] = "" + res;
    })
  }

}
