import { Component, Output, Input, OnInit, EventEmitter, NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {diaMesSelecionadoPipe} from '../../pipes/pipe';
import {diaSemanaSelecionadoPipe} from '../../pipes/pipe';

import * as $ from "jquery";

@Component({
  selector: 'seleciona-data',
  templateUrl: './selecionaData.component.html',
  styleUrls: ['./selecionaData.component.css']
})

export class SelecionaDataComponent implements OnInit {

  mesAnoSelecionado = '';

  myDateRangePickerOptions: IMyDrpOptions = {
    inline:true,
    dayLabels:{su: 'D', mo: 'S', tu: 'T', we: 'Q', th: 'Q', fr: 'S', sa: 'S'},
    monthLabels:{ 1: 'Janeiro', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    dateFormat: 'dd.mm.yyyy',
    yearSelector:false,
    markCurrentYear:false,
    showClearBtn:false
  };

  dataInicio:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2 );
  dataFim:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7 );

  model: any = {beginDate: {year: this.dataInicio.getFullYear(), month: this.dataInicio.getMonth() + 1, day: this.dataInicio.getDate()},
                      endDate: {year: this.dataFim.getFullYear(), month: this.dataFim.getMonth() + 1, day: this.dataFim.getDate()}};

  value = {};
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  @Output() periodoSelecionado: EventEmitter<any> = new EventEmitter();
  @Input() dadosPeriodo: any;

  ngOnInit() { 
    this.periodoSelecionado.emit({event:null,dados:{dataInicio:this.dataInicio, dataFim:this.dataFim}});    
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }

  public inicializaValores(obj){
    this.dataInicio = obj.dataInicio;
    this.dataFim = obj.dataFim;

    this.model = {beginDate: {year: this.dataInicio.getFullYear(), month: this.dataInicio.getMonth() + 1, day: this.dataInicio.getDate()},
    endDate: {year: this.dataFim.getFullYear(), month: this.dataFim.getMonth() + 1, day: this.dataFim.getDate()}};    
  }

  public aplicarData(evt){
    this.periodoSelecionado.emit({event:null,dados:{dataInicio:this.dataInicio, dataFim:this.dataFim}});    
    this.onFechar.emit(null);
  }

  public onMudouPeriodo(evt){
    if(evt.type == 1){
      this.dataInicio = evt.jsdate;
      this.dataFim = null;
    }
    else
      this.dataFim = evt.jsdate;
  }

  public calendarViewChanged(event){
    var ano = event.year;
    var mes = event.month;

    this.mesAnoSelecionado = this.meses[mes - 1] + ' de ' + ano;
  }
  
}
