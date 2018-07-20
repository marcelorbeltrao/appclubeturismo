import { Component, ViewChild, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';

import * as $ from "jquery";

@Component({
  selector: 'tela-texto',
  templateUrl: './telaTexto.component.html',
  styleUrls: ['./telaTexto.component.css']
})

export class TelaTextoComponent implements OnInit {
  
  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  
  constructor() {   }
  
  textoTela = '';
  textoCompleto = '';
  
  ngOnInit() {
  }

  public voltarTela(){
    this.onFechar.emit(null);
  }
}

