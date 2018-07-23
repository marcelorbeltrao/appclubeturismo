import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http'
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import * as $ from "jquery";

@Component({
  selector: 'selecione-dia',
  templateUrl: './selecioneDia.component.html',
  styleUrls: ['./selecioneDia.component.css']
})

export class SelecioneDiaComponent implements OnInit {
  public searchControl: FormControl;

  constructor() {
  }

  @Output() onDiaSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  textoPesquisa = '';

  localOrigem = null;
  localDestino = null;
  qtdQuartos = 0;
  qtdAdultos = 0;
  qtdCriancas = 0;
  listaCriancas = {};
  diaSelecionado = null;

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

  public inicializa(obj, diaSelecionado){
    this.listaResultado = obj;
    this.diaSelecionado = diaSelecionado;
  }
  
  public diaSelecionadoClick(item){
    this.onDiaSelecionado.emit({event:null, dados: item});
    this.fechaTela();
  }

  public fechaTela(){
    this.textoPesquisa = '';
    this.listaResultado = [];

    this.onFechar.emit(null);    
  }
  public carregarPeriodos(obj) {
    var me = this;

  }
}
