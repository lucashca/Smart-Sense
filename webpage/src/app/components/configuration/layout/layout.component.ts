import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentUI } from 'src/app/class/component-ui';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  @Input() components:ComponentUI[];
  
  @Input() layoutPile:ComponentUI[];
  componentsForm = new FormControl();
  
  ngOnInit() {
    console.log("layoutpile")
    console.log(this.layoutPile);
    console.log(this.components);
  }


  addLayout(){
    this.layoutPile.push(null);
  
  }
  removeLayout(index){
    let layout = [];
    for(let i in this.layoutPile){
      let id = parseInt(i);
      if(id !=index){
        layout.push(this.layoutPile[id])
      }
    }
    this.layoutPile = layout;
  }

  onSelectionComponentChange(l,i){
    this.layoutPile[i] = l;
    console.log(this.layoutPile);
  }
}
