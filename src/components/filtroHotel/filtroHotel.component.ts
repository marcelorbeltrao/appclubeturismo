import { Component, Output, OnInit,EventEmitter,NgModule} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import * as $ from "jquery";

@Component({
  selector: 'filtro-hotel',
  templateUrl: './filtroHotel.component.html',
  styleUrls: ['./filtroHotel.component.css']
})

export class FiltroHotelComponent implements OnInit {

  @Output() onFiltro: EventEmitter<any> = new EventEmitter();

  qtdQuartos = 1;
  qtdAdultos = 2;
  qtdCriancas = 0;

  listaCriancas = [];
  
  mostraProcuraLocal = false;
  mostraSelecionaData = false;
  dataInicio = null;
  dataFim = null;

  cidadeSelecionada = false;
  textoLocalSelecionado = 'Selecione uma cidade';
  idLocalSelecionado = null;
  valPeriodoSelecionado = '';
  pontoLocalSelecionado = null;

  ngOnInit() {
  }

  public onFecharProcuraLocal(){
    var me = this;
    $('.procuraLocalFiltroHotel .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocalFiltroHotel').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraProcuraLocal = false;
    });    
  }

  public selecionarLocal(){
    this.mostraProcuraLocal = true;
    
    $('.procuraLocalFiltroHotel').css({'margin-left':'100vw'});
    $('.procuraLocalFiltroHotel').animate({'margin-left':'0'},200, function(){
        $('.procuraLocalFiltroHotel .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }

  public selecionarData(){
    this.mostraSelecionaData = true;
    $('.selecionaDataFiltroHotel').css({'margin-left':'100vw'});
    $('.selecionaDataFiltroHotel').animate({'margin-left':'0'},200, function(){
        $('.selecionaDataFiltroHotel .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }  

  public onFecharSelecionaData(){
    var me = this;
    $('.selecionaDataFiltroHotel .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionaDataFiltroHotel').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraSelecionaData = false;
    });    
  }

  public localSelecionado(evt){
    this.textoLocalSelecionado = evt.dados.city.name + ', ' + evt.dados.city.state.name;
    this.idLocalSelecionado = evt.dados.city.id;

    this.cidadeSelecionada = true;
  }

  public adicionaZero(val){
    if(String(val).length == 1)
      return '0' + String(val);
    else
      return val;
  }

  public periodoSelecionado(evt){
      this.dataInicio = evt.dados.dataInicio;
      var dt1 = evt.dados.dataInicio;
      var dtInicio = this.adicionaZero(dt1.getDate()) + '/' + this.adicionaZero((dt1.getMonth() + 1)) + '/' +  dt1.getFullYear();

      this.dataFim = evt.dados.dataFim;
      var dt2 = evt.dados.dataFim;
      var dtFim = this.adicionaZero(dt2.getDate()) + '/' + this.adicionaZero((dt2.getMonth() + 1)) + '/' +  dt2.getFullYear();

      this.valPeriodoSelecionado = dtInicio + ' - ' + dtFim;
  }

  public aumentaQtdQuarto (){
    if(this.qtdQuartos == 4)
      return;

    this.qtdQuartos++;
  }

  public diminuiQtdQuarto (){
    if(this.qtdQuartos > 1)
      this.qtdQuartos--;
  }

  public aumentaQtdAdultos (){
    if(this.qtdAdultos == 4)
      return;

    this.qtdAdultos++;
  }

  public diminuiQtdAdultos (){
    if(this.qtdAdultos > 1)
      this.qtdAdultos--;
  }
  
  public aumentaQtdCriancas (){
    if(this.qtdCriancas > 2)
      return;

    this.qtdCriancas++;

    this.listaCriancas.push({label:'Idade Criança ' + (this.listaCriancas.length + 1), idadeCrianca:0});
  }

  public diminuiQtdCriancas (){
    if(this.qtdCriancas > 0){
      this.qtdCriancas--;

      this.listaCriancas.pop();
    }
  }

  public aumentaIdadeCrianca (item){
    if(item.idadeCrianca > 11)
      return;

    item.idadeCrianca++;
  }

  public diminuiIdadeCrianca (item){
    if(item.idadeCrianca > 0)
      item.idadeCrianca--;
  }  

  public onFiltroClick(){
    this.onFiltro.emit({event:null, dados: {textoPesquisa:this.textoLocalSelecionado, idLocalSelecionado:this.idLocalSelecionado, pontoLocalSelecionado:this.pontoLocalSelecionado, dataInicio:this.dataInicio, dataFim:this.dataFim, qtdQuartos:this.qtdQuartos, qtdAdultos:this.qtdAdultos, qtdCriancas:this.qtdCriancas, listaCriancas:this.listaCriancas }});
  }

}
