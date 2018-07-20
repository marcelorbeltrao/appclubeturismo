import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http'
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ProcuraLocalModel } from '../procuraLocal/procuraLocal.model';

import * as $ from "jquery";

@Component({
  selector: 'procura-local',
  templateUrl: './procuraLocal.component.html',
  styleUrls: ['./procuraLocal.component.css']
})

export class ProcuraLocalComponent implements OnInit {
  public searchControl: FormControl;

  constructor(public procuraLocal:ProcuraLocalModel) {
  }

  @Output() localSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  textoPesquisa = '';
  apiMapsKey = 'AIzaSyDE2zfjFQAyso_eXyZyN6NxG-igBx-vdZk';
  listaResultado:any = [];
  listaHistorico = [];
  mostraCarregando = false;

  ngOnInit() {
    /*
    var lista:any = localStorage.getItem('listaUltimos');
    if(lista)
      this.listaHistorico = JSON.parse(lista);
      */
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

  public localSelecionadoClick(item){
    /*
    var lista:any = localStorage.getItem('listaUltimos');
    var lst:any = [];

    if(!lista)
      {
        lst = [item];
      }
    else{
      var lst = JSON.parse(lista);
      lst.push(item);

    }
    
    this.listaHistorico = lst;

    //localStorage.setItem("listaUltimos", JSON.stringify(lst));
*/

    this.localSelecionado.emit({event:null, dados: item});
    this.fechaTela();
  }

  public inicializa(){

  }
  
  public historicoSelecionado(item){
    this.localSelecionado.emit({event:null, dados: item});
    this.fechaTela();
  }

  public fechaTela(){
    this.textoPesquisa = '';
    this.listaResultado = [];
  
    this.onFechar.emit(null);    
  }
  
  public realizaBusca() {
    var me = this;
    
    this.mostrarCarregando();
    
    var resp = this.procuraLocal.pesquisaHoteis(this.textoPesquisa).then(function(lst){
      me.listaResultado = lst;
      me.fecharCarregando();
    });
  }
}
