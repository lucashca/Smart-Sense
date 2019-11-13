import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { Chart } from "chart.js";
import { formatDate } from "@angular/common";
import { ComponentUI } from "src/app/class/component-ui";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-rts-chart",
  templateUrl: "./rts-chart.component.html",
  styleUrls: ["./rts-chart.component.css"]
})
export class RtsChartComponent implements OnInit {
  @Input() component: ComponentUI;
  @ViewChild("lineChart", null) canvasChart: ElementRef;

  constructor(private appServices: AppService) { }

  info = false;
  sizeData = 50;

  data = [];
  time = [];

  val: Number;
  LineChart = [];

  appendData(d) {
    //let d = Math.floor(Math.random() * 10);

    if (this.data.length >= this.sizeData) {
      this.data = this.data.slice(1, this.data.length);
      this.time = this.time.slice(1, this.data.length);

      this.data.push(d);
      this.time.push(formatDate(new Date(), "hh:mm:ss a", "en"));
    } else {
      this.data.push(d);
      this.time.push(formatDate(new Date(), "hh:mm:ss a", "en"));
    }
  }

  async ngOnInit() {
    this.data.push(0);
    this.time.push(0);
    this.renderCanvas();
    await this.resolveAfterXMileSeconds(1000);
    this.run();
  }

  async run() {
    while (true) {
      await this.resolveAfterXMileSeconds(100);
      this.getData();
    }
  }

  renderCanvas() {
    this.LineChart = new Chart(
      this.canvasChart.nativeElement.getContext("2d"),
      {
        type: "line",
        data: {
          labels: this.time,
          datasets: [
            {
              data: this.data,
              backgroundColor: ["rgba(0,0,0, 0.0)"],
              borderColor: ["rgba(99, 132, 255, 1)"],
              borderWidth: 2
            }
          ]
        },
        options: {
          animation: {
            duration: 0
          },
          events: ["click"],
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
    );
  }

  resolveAfterXMileSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, x);
    });
  }



  async monitor() {
    while (true) {
      await this.resolveAfterXMileSeconds(500);
      this.getData();
    }
  }



  getData() {
    this.appServices.getData(this.component.device, this.component.dataIN[0]).subscribe((res) => {
      this.appendData(res);
      this.renderCanvas();
    })
  }

}
