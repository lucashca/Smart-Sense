import { Component, OnInit, Input } from '@angular/core';
import { ComponentUI } from "src/app/class/component-ui";
import { AppService } from "src/app/app.service";
import { timeout } from "q";
import { promise } from "protractor";

@Component({
  selector: 'app-campo-dados',
  templateUrl: './campo-dados.component.html',
  styleUrls: ['./campo-dados.component.css']
})
export class CampoDadosComponent implements OnInit {



  @Input() component: ComponentUI;
  data: String = "Default Data"


  constructor(private appServices: AppService) { }

  ngOnInit() {
    this.monitor();
  }


  async monitor() {
    while (true) {
      await this.resolveAfterXMileSecondes(500);
      this.getData();
    }
  }

  resolveAfterXMileSecondes(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, x)
    })
  }

  getData() {
    this.appServices.getData(this.component.device, this.component.dataIN[0]).subscribe((res) => {
      this.data = "" + res;
    })
  }
}
