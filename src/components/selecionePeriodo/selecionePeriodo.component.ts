import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http'
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { SelecionePeriodoModel } from '../selecionePeriodo/selecionePeriodo.model';

import * as $ from "jquery";

@Component({
  selector: 'selecione-periodo',
  templateUrl: './selecionePeriodo.component.html',
  styleUrls: ['./selecionePeriodo.component.css']
})

export class SelecionePeriodoComponent implements OnInit {
  public searchControl: FormControl;

  constructor(public selecionePeriodo:SelecionePeriodoModel) {
  }

  @Output() periodoSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  textoPesquisa = '';

  localOrigem = null;
  localDestino = null;
  qtdQuartos = 0;
  qtdAdultos = 0;
  qtdCriancas = 0;
  listaCriancas = {};

  listaResultado:any = [];
  listaHistorico = [];
  mostraCarregando = false;

  ngOnInit() {
    var lista:any = localStorage.getItem('listaUltimos');
    if(lista)
      this.listaHistorico = JSON.parse(lista);
  }

  public mostrarCarregando(){
    this.mostraCarregando = true;
  }

  public fecharCarregando(){
    this.mostraCarregando = false;
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }

  public inicializa(obj){
    this.localOrigem = obj.localOrigem;
    this.localDestino = obj.localDestino;
    this.qtdQuartos = obj.qtdQuartos;
    this.qtdAdultos = obj.qtdAdultos;
    this.qtdCriancas = obj.qtdCriancas;
    this.listaCriancas = obj.listaCriancas;

    this.carregarPeriodos(obj);
  }
  
  public periodoSelecionadoClick(item){
    this.periodoSelecionado.emit({event:null, dados: {item:item, listaResultado:this.listaResultado});
    this.fechaTela();
  }

  public fechaTela(){
    this.textoPesquisa = '';
    this.listaResultado = [];

    
    this.onFechar.emit(null);    
  }
  public carregarPeriodos(obj) {
    var me = this;
    
    this.mostrarCarregando();
    
    var resp = this.selecionePeriodo.listaPeriodos(obj).then(function(lst:any){
      var arr = [];
      var arrVer = [];
      var listaPacotes = lst[0].packages.items;

      for(var k = 0 ; k < listaPacotes.length; k ++){
        var meses = listaPacotes[k].departure.months.items;
        
        for(var t = 0 ; t < meses.length; t ++){

            if(!arrVer.includes(meses[t].month + '-' + meses[t].year)){
              arrVer.push(meses[t].month + '-' + meses[t].year);
              arr.push(meses[t]);
            }
              
        }
      }

      me.listaResultado = arr;
      me.fecharCarregando();
    });
  }
}
