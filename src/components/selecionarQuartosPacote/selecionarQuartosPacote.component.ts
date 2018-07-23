import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import * as $ from "jquery";

@Component({
  selector: 'selecionar-quartos-pacote',
  templateUrl: './selecionarQuartosPacote.component.html',
  styleUrls: ['./selecionarQuartosPacote.component.css']
})

export class SelecionarQuartosPacoteComponent implements OnInit {
  
  quartos = [];
  qtdPessoas = 0;

  constructor() {
  }
  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  @Output() quartoClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  public setQuartos(arr:any,qtdPessoas:any){
    this.quartos = arr;
    for(var t = 0 ; t < this.quartos.length; t ++){
      this.quartos[t].nomeQuarto = this.quartos[t].fares.items[0].accommodations.items[0].name;
      this.quartos[t].mealPlan = this.quartos[t].fares.items[0].accommodations.items[0].fares.items[0].mealPlan.name;
      this.quartos[t].valor = this.quartos[t].fares.items[0].fare.base.amount;
      this.quartos[t].availableRooms = this.quartos[t].fares.items[0].accommodations.items[0].availableRooms;
      this.quartos[t].qtdPessoas = qtdPessoas;
    }
  }

  public itemSelecionado(item){
    this.quartoClick.emit({event:null, data:item});
    this.onFechar.emit(null);
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }
}
