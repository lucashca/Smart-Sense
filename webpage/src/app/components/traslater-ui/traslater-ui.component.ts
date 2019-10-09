import { Component, OnInit, Input } from "@angular/core";
import { ComponentUI } from "src/app/class/component-ui";

@Component({
  selector: "app-traslater-ui",
  templateUrl: "./traslater-ui.component.html",
  styleUrls: ["./traslater-ui.component.css"]
})
export class TraslaterUIComponent implements OnInit {
  @Input() component: ComponentUI;

  constructor() {}

  ngOnInit() {
    console.log(this.component);
  }
}
