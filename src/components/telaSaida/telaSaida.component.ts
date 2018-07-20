import { Component, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'tela-saida',
  templateUrl: './telaSaida.component.html',
  styleUrls: ['./telaSaida.component.css']
})

export class TelaSaidaComponent implements OnInit {
  
  listaCidades = [];
  objPacotes = {};
  qtdSelec = 0;
  qtdPacotes = 0;
  pacotesSelecionados = [];

  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  @Output() onFiltroAplicado: EventEmitter<any> = new EventEmitter();
  
  constructor() {   }
 
  ngOnInit() {
  }

  public setCidades(obj){
    this.listaCidades = obj.listaCidades;
    this.objPacotes = obj.objPacotes;

    this.verificaSelecionados();
  }

  public itemSaidaClicado(evt){
    this.verificaSelecionados();
  }

  public verificaSelecionados(){
      this.qtdSelec = 0;
      this.qtdPacotes = 0;
      this.pacotesSelecionados = [];

      for(var t = 0 ; t < this.listaCidades.length; t++){
          this.qtdPacotes += this.listaCidades[t].pacotes.length;

          if(this.listaCidades[t].selecionado){
              this.qtdSelec += this.listaCidades[t].pacotes.length;

              for(var w = 0 ; w < this.listaCidades[t].pacotes.length; w++){
                  this.pacotesSelecionados.push(this.listaCidades[t].pacotes[w]);
              }

            }
      }
  }

  public desmarcaSelecao(){
    this.qtdSelec = 0;
    this.pacotesSelecionados = [];

    for (var k = 0; k < this.listaCidades.length; k++) {
      this.listaCidades[k]['selecionado'] = false;
    }
  }

  public limparSelecao(){
      this.pacotesSelecionados = [];

    for (var k = 0; k < this.listaCidades.length; k++) {
      this.listaCidades[k]['selecionado'] = true;
      this.qtdSelec++;
    }
  }
  
  public voltarTela(){
    this.onFechar.emit(null);
  }

  public aplicarFiltro(evt){
    this.onFiltroAplicado.emit({event:evt, pacotes:this.pacotesSelecionados, filtroAplicado:(this.pacotesSelecionados.length != this.qtdPacotes)});
    this.onFechar.emit(null);
  }
}
