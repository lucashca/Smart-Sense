import { Injectable, EventEmitter } from '@angular/core';
import { ComponentUI } from 'src/app/class/component-ui';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor() { }

  static layoutEmmiter = new EventEmitter<ComponentUI[]>();
  static layout: ComponentUI[] = [];


  setLayout(layout:ComponentUI[]){
    HomeService.layoutEmmiter.emit(layout);
    HomeService.layout = layout;
  }

  static getLayout(){
    return HomeService.layout;
  }
}
