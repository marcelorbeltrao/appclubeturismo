import { Component, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'item-hotel',
  templateUrl: './itemHotel.component.html',
  styleUrls: ['./itemHotel.component.css']
})

export class ItemHotelComponent implements OnInit {
  
  @HostBinding('class.dados') @Input() dados;
  
  item = {};

  mostraEstrela1 = false;
  mostraEstrela15 = false;
  mostraEstrela2 = false;
  mostraEstrela25 = false;
  mostraEstrela3 = false;
  mostraEstrela35 = false;
  mostraEstrela4 = false;
  mostraEstrela45 = false;
  mostraEstrela5 = false;

  constructor(  ) {
  }
 
  ngOnInit() {
    this.item = this.dados;

    if(this.item['stars'] == 1){
      this.item['mostraEstrela1'] = true;
    }
    if(this.item['stars'] == 1.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela15'] = true;
    }
    if(this.item['stars'] == 2){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
    }    
    if(this.item['stars'] == 2.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela25'] = true;
    }        
    if(this.item['stars'] == 3){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
    }        
    if(this.item['stars'] == 3.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela35'] = true;
    }          
    if(this.item['stars'] == 4){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
    }        
    if(this.item['stars'] == 4.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
      this.item['mostraEstrela45'] = true;
    }        
    if(this.item['stars'] >= 5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
      this.item['mostraEstrela5'] = true;
    }            
  }
}
