import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ComponentUI } from "src/app/class/component-ui";

@Injectable({
  providedIn: 'root'
})


export class ConfigurationService {

  private serverURL = 'http://localhost:3000/'
 
  constructor(private http:HttpClient) { }


  getDevices(){
    let getDevicesURL =  this.serverURL + 'getDevices';
    return this.http.get(getDevicesURL);
  }
  setComponents(components:ComponentUI[]){
    let setComponentsURL = this.serverURL + 'setComponents' ;
    return this.http.post(setComponentsURL,components);
  }
  getComponents(){
    let getComponentsURL = this.serverURL + 'getComponents' ;
    return this.http.get(getComponentsURL);
  }
  setLayout(layout:ComponentUI[]){
    let layoutURL = this.serverURL + 'setLayout'  
    return this.http.post(layoutURL,layout);
  }
  getLayout(){
    let layoutURL = this.serverURL + 'getLayout'  
    return this.http.get(layoutURL);
  }

}
