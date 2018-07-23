import { Component, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'item-hotel-pacote',
  templateUrl: './itemHotelPacote.component.html',
  styleUrls: ['./itemHotelPacote.component.css']
})

export class ItemHotelPacoteComponent implements OnInit {
  
  @HostBinding('class.dados') @Input() dados;
  
  item:any = {};

  mostraEstrela1 = false;
  mostraEstrela15 = false;
  mostraEstrela2 = false;
  mostraEstrela25 = false;
  mostraEstrela3 = false;
  mostraEstrela35 = false;
  mostraEstrela4 = false;
  mostraEstrela45 = false;
  mostraEstrela5 = false;

  quartoSelecionado:any = {};
  tipoRefeicao = '';
  quartos:any = [];

  constructor(  ) {
  }
 
  ngOnInit() {
    this.item = this.dados.hotel;
    this.quartos = this.dados.quartos;

    this.item.valor = this.dados.quartos[0].fares.items[0].fare.base.amount / this.dados.qtdPessoas;
    this.item.photo = this.item.hotels.items[0].photo;

    this.quartoSelecionado = this.quartos[0].hotels.items[0].accommodations.items[0];
    this.tipoRefeicao = this.quartoSelecionado.fares.items[0].mealPlan.name;

    if(this.item.hotels.items[0]['stars'] == 1){
      this.item['mostraEstrela1'] = true;
    }
    if(this.item.hotels.items[0]['stars'] == 1.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela15'] = true;
    }
    if(this.item.hotels.items[0]['stars'] == 2){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
    }    
    if(this.item.hotels.items[0]['stars'] == 2.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela25'] = true;
    }        
    if(this.item.hotels.items[0]['stars'] == 3){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
    }        
    if(this.item.hotels.items[0]['stars'] == 3.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela35'] = true;
    }          
    if(this.item.hotels.items[0]['stars'] == 4){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
    }        
    if(this.item.hotels.items[0]['stars'] == 4.5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
      this.item['mostraEstrela45'] = true;
    }        
    if(this.item.hotels.items[0]['stars'] >= 5){
      this.item['mostraEstrela1'] = true;
      this.item['mostraEstrela2'] = true;
      this.item['mostraEstrela3'] = true;
      this.item['mostraEstrela4'] = true;
      this.item['mostraEstrela5'] = true;
    }            
  }
}
