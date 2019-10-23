import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Device } from "./class/device";
import { CommandRoute } from "./class/command-route";
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  serverURL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  sendCommandToDevice(device: Device, commad: CommandRoute, data: any = null) {
    let url = this.serverURL + "sendCommand"
    return this.http.post(url, { device: device, commad: commad, data: data }).pipe(
      timeout(1000)
    );
  }

  getData(device: Device, commad: CommandRoute) {
    let url = this.serverURL + 'getData';
    return this.http.post(url, { device: device, commad: commad }).pipe(
      timeout(1000)
    );
  }
}
