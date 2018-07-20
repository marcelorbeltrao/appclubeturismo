import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import * as $ from "jquery";

@Component({
  selector: 'selecionar-quartos',
  templateUrl: './selecionarQuartos.component.html',
  styleUrls: ['./selecionarQuartos.component.css']
})

export class SelecionarQuartosComponent implements OnInit {
  
  quartos = [];
  hotel = {};
  
  constructor() {
  }
  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  public setQuartos(arr:any,hotel:any){
    this.quartos = arr;
    this.hotel = hotel;
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }
}
