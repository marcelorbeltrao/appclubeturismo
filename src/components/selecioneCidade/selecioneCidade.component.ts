import { ElementRef, Component, Output, OnInit, EventEmitter, NgModule, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http'
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { SelecioneCidadeModel } from '../selecioneCidade/selecioneCidade.model';

import * as $ from "jquery";

@Component({
  selector: 'selecione-cidade',
  templateUrl: './selecioneCidade.component.html',
  styleUrls: ['./selecioneCidade.component.css']
})

export class SelecioneCidadeComponent implements OnInit {
  public searchControl: FormControl;

  constructor(public selecioneCidade:SelecioneCidadeModel) {
  }

  @Output() localSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  textoPesquisa = '';
  apiMapsKey = 'AIzaSyDE2zfjFQAyso_eXyZyN6NxG-igBx-vdZk';
  listaResultado:any = [];
  listaHistorico = [];
  mostraCarregando = false;
  tipoPacote = null;
  idCidade = null;
  textoTela = '';
  
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
    this.listaResultado = [];
    this.onFechar.emit(null);
  }

  public localSelecionadoClick(item){
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

    localStorage.setItem("listaUltimos", JSON.stringify(lst));

    this.localSelecionado.emit({event:null, dados: this.listaResultado[0]});
    this.fechaTela();
  }

  public inicializa(id, idCidade, tipoPacote){
      if(idCidade) 
        this.textoTela = 'Selecione a cidade de destino';
      else
        this.textoTela = 'Selecione a cidade de origem';

      this.carregarLocais(id, idCidade, tipoPacote);
  }
  
  public historicoSelecionado(item){
    this.localSelecionado.emit({event:null, dados: item});
    this.fechaTela();
  }

  public fechaTela(){
    this.idCidade = null;
    this.listaResultado = [];
    this.tipoPacote = null;
    
    this.onFechar.emit(null);    
  }
  public carregarLocais(id, idCidade, tipoPacote) {
    var me = this;
    me.listaResultado = [];
    var paises = {};
    this.idCidade = idCidade;
    this.tipoPacote = tipoPacote;

    this.mostrarCarregando();
    
    var resp = this.selecioneCidade.listaCidades(id,idCidade).then(function(lst:any){
      if(!tipoPacote){
        for(var t = 0 ; t < lst.length; t++){
          me.listaResultado.push({id:lst[t].city.id, pais:lst[t].city.name + ', ' + lst[t].city.state.name});
        }
      }
      else{
        for(var t = 0 ; t < lst.length; t++){
          if(tipoPacote ==  1 && lst[t].city.national)
            me.listaResultado.push({id:lst[t].city.id, pais:lst[t].city.name + ', ' + lst[t].city.state.name});
          else if(tipoPacote == 2 && !lst[t].city.national){
            if(!paises[lst[t].city.country.name]){
              paises[lst[t].city.country.name] = {id:lst[t].city.id, pais:lst[t].city.country.name, cidades:[{id:lst[t].city.id, pais:lst[t].city.name}]};
            }
            else
              paises[lst[t].city.country.name].cidades.push({id:lst[t].city.id, pais:lst[t].city.name});
          }
        }

        if(tipoPacote == 2){
          for(var prop in paises){
            me.listaResultado.push(paises[prop]);
          }
          
        }
      }
      me.fecharCarregando();
    });
  }
}
