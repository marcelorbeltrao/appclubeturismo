import { Component, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'resumo-selecao',
  templateUrl: './resumoSelecao.component.html',
  styleUrls: ['./resumoSelecao.component.css']
})

export class ResumoSelecaoComponent implements OnInit {
  
  @Output() onFechar: EventEmitter<any> = new EventEmitter();
 
 constructor() {   }
 
  ngOnInit() {
  }


  public voltarTela(){
    this.onFechar.emit(null);
  }
}
