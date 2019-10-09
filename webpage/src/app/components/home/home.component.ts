import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/login/auth.service";
import { Router } from "@angular/router";
import { HomeService } from "./home.service";
import { ComponentUI } from "src/app/class/component-ui";
import { ConfigurationService } from "../configuration/configuration.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  layout: ComponentUI[] = [];

  comp = new ComponentUI(
    "real-time-chart",
    "rts",
    1,
    0,
    null,
    null,
    null,
    "123123123123"
  );
  constructor(
    public authService: AuthService,
    private router: Router,
    private homeService: HomeService,
    private confiugrationService: ConfigurationService,
  ) { }

  isAutenticated = false;

  ngOnInit() {
    this.getLayout();
  }


  getLayout() {
    this.confiugrationService.getLayout().subscribe((res: ComponentUI[]) => {
      this.layout = res
      console.log(this.layout)
    });
  }

  print() {
    console.log(this.layout);
  }
}
