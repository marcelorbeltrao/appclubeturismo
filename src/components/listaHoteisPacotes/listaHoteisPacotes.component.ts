import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetalhesHotelComponent } from '../../components/detalhesHotel/detalhesHotel.component';
import { ProcuraLocalComponent } from '../../components/procuraLocal/procuraLocal.component';
import { FiltroHotelComponent } from '../../components/filtroHotel/filtroHotel.component';
import { TelaFiltrosComponent } from '../../components/telaFiltros/telaFiltros.component';
import { TelaMapaComponent } from '../../components/telaMapa/telaMapa.component';
import { SelecionaDataComponent } from '../../components/selecionaData/selecionaData.component';
import { SelecionaPessoasComponent } from '../../components/selecionaPessoas/selecionaPessoas.component';

import * as $ from "jquery";

@Component({
  providers: [SelecionaDataComponent],
  selector: 'lista-hoteis-pacotes',
  templateUrl: './listaHoteisPacotes.component.html',
  styleUrls: ['./listaHoteisPacotes.component.css']
})

export class ListaHoteisPacotesComponent implements OnInit {

  @ViewChild("detalhesHotel")
  private detalhesHotel: DetalhesHotelComponent;

  @ViewChild("telaMapaHotel")
  private telaMapaHotel: TelaMapaComponent

  @ViewChild("telaFiltroComp")
  private telaFiltroComp: TelaFiltrosComponent;

  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  @Output() onHotelSelecionado: EventEmitter<any> = new EventEmitter();

  constructor() { };

  textoPesquisa = 'Pesquise um destino ou pacote';
  items: any = [];
  itemsOriginal: any = [];

  objFiltro: any = {};

  mostraDetalhesHotel = false;
  mostraProcuraLocal = false;
  mostraTelaFiltro = false;
  mostraTelaMapa = false;
  mostraSelecionaData = false;
  mostraFiltro = false;
  mostraPesquiarHotel = true;
  mostraSelecionaPessoas = false;
  hotelSelecionado = {};
  scrollAnt = 0;
  valPeriodoSelecionado = '';
  qtdHospedesPesquisa = 2;
  qtdQuartosPesquisa = 1;
  textoLocalSelecionado = '';
  idLocalSelecionado = null;

  qtdQuartos = 0;

  qtdAdultosPesquisa = 1;
  qtdCriancasPesquisa = 0;
  listaCriancasPesquisa = [];
  filtroFiltroAplicado = false;
  mostraCarregando = false;
  pontoLocalSelecionado = null;
  carregouFiltro = false;
  dataInicio = null;
  dataFim = null;

  objPacotes = {};
  qtdPessoas = 0;

  ngOnInit() {
  }

  public voltarTela() {
    this.items = [];
    this.onFechar.emit(null);
  }

  public setListaHoteis(lista, qtdPessoas){
    this.qtdQuartos = 0;
    
    for(var k = 0 ; k < lista.length; k ++){
      lista[k].qtdPessoas = qtdPessoas;
      for(var t = 0 ; t < lista[k].quartos.length; t ++){
        var itm = lista[k].quartos[t].fares.items[0].accommodations.items[0].availableRooms;
        this.qtdQuartos += itm;
      }
    }

    this.items = lista;
  }

  public mostrarCarregando() {
    this.mostraCarregando = true;
  }

  public fecharCarregando() {
    this.mostraCarregando = false;
  }

  public localSelecionado(evt) {
    this.textoLocalSelecionado = evt.dados.city.name + ', ' + evt.dados.city.state.name;
    this.idLocalSelecionado = evt.dados.city.id;

    //this.pontoLocalSelecionado = evt.dados.geometry.location;

    this.carregarRegistros();
  }

  public onFecharSelecionaData() {
    var me = this;
    $('.botaoVoltarHotel').animate({ 'opacity': 1 });
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionaData').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraSelecionaData = false;
    });
  }


  public adicionaZero(val) {
    if (String(val).length == 1)
      return '0' + String(val);
    else
      return val;
  }

  public carregarRegistros() {
    if (!this.carregouFiltro)
      return;

    var me = this;
    me.mostrarCarregando();
    me.qtdQuartos = 0;

  }

  public onScroll(event) {
    if (event.currentTarget.scrollTop < this.scrollAnt)
      $('.caixaFiltro').css({ 'display': 'flex' });
    else
      $('.caixaFiltro').css({ 'display': 'none' });

    this.scrollAnt = event.currentTarget.scrollTop;
  }

  public mostarMapaClick() {
    this.mostraTelaMapa = true;

    this.telaMapaHotel.inicializaVariaveis(this.textoLocalSelecionado, this.pontoLocalSelecionado, this.items);

    $('.telaMapa').css({ 'margin-left': '100vw' });
    $('.telaMapa').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltarTela').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public onFecharMapa() {
    var me = this;
    $('.botaoVoltarTela').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaMapa').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraTelaMapa = false;
    });
  }

  public mostarFiltroClick() {
    this.mostraTelaFiltro = true;
    this.telaFiltroComp.setPacotes(this.itemsOriginal);

    $('.telaFiltro').css({ 'margin-left': '100vw' });
    $('.telaFiltro').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltarTela').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public onFecharFiltro() {
    var me = this;
    $('.botaoVoltarTela').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaFiltro').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraTelaFiltro = false;
    });
  }

  public onFiltroHotel(evt) {
    this.objFiltro = evt.dados;

    this.qtdHospedesPesquisa = evt.dados.qtdAdultos + evt.dados.qtdCriancas;
    this.qtdAdultosPesquisa = evt.dados.qtdAdultos;
    this.qtdCriancasPesquisa = evt.dados.qtdCriancas;
    this.qtdQuartosPesquisa = evt.dados.qtdQuartos;
    this.listaCriancasPesquisa = evt.dados.listaCriancas;
    this.textoLocalSelecionado = evt.dados.textoPesquisa;

    this.pontoLocalSelecionado = evt.dados.pontoLocalSelecionado;

    this.dataInicio = evt.dados.dataInicio;
    var dt1 = evt.dados.dataInicio;
    var dtInicio = this.adicionaZero(dt1.getDate()) + '/' + this.adicionaZero((dt1.getMonth() + 1)) + '/' + dt1.getFullYear();

    this.dataFim = evt.dados.dataFim;
    var dt2 = evt.dados.dataFim;
    var dtFim = this.adicionaZero(dt2.getDate()) + '/' + this.adicionaZero((dt2.getMonth() + 1)) + '/' + dt2.getFullYear();

    this.valPeriodoSelecionado = dtInicio + ' - ' + dtFim;
    this.mostrarCarregando();
    this.carregouFiltro = true;

    var me = this;

    $('.filtroHotel').animate({ 'top': '100vh' }, 300, function () {
      $('.botaoVoltarHotel').css({ 'opacity': 1, 'margin-left': 0 });
      me.mostraPesquiarHotel = false;
      me.carregarRegistros();
    });
  }

  public mostraPesquisa() {
    this.mostraCarregando = true;

    $('.icoCarregando').css({ 'padding-top': '80px' });
    $('.icoCarregando').animate({ 'padding-top': '0px' });

    var me = this;
    setTimeout(function () {
      me.onMostraPesquisa();
    }, 1000)
  }

  public onMostraPesquisa() {
    this.mostraCarregando = false;
  }

  public onFiltroFiltroAplicado(event) {
    this.filtroFiltroAplicado = event.filtroAplicado;
    this.items = event.pacotes;
  }

  public voltarFiltro() {
    var me = this;
    $('.botaoVoltarHotel').animate({ 'opacity': 0 }, function () {
      me.mostraPesquiarHotel = true;
      $('.filtroHotel').animate({ 'top': '0' }, 200);
    });
  }

  public selecionarLocal() {
    this.mostraProcuraLocal = true;

    $('.botaoVoltarHotel').animate({ 'opacity': 0 });
    $('.procuraLocal').css({ 'margin-left': '100vw' });
    $('.procuraLocal').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public itemSelecionado(item) {
    this.hotelSelecionado = item;

    this.onHotelSelecionado.emit({event:null, data:this.hotelSelecionado});
    this.onFechar.emit(null);
  }

}
