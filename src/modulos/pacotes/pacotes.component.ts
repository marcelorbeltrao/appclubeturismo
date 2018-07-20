import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalhesPacoteComponent } from '../../components/detalhesPacote/detalhesPacote.component';
import { TelaFiltrosComponent } from '../../components/telaFiltros/telaFiltros.component';
import { TelaMapaComponent } from '../../components/telaMapa/telaMapa.component';
import { SelecionaDataComponent } from '../../components/selecionaData/selecionaData.component';
import { SelecionaPessoasComponent } from '../../components/selecionaPessoas/selecionaPessoas.component';

import * as $ from "jquery";
import { PacotesModel } from './pacotes.model';

@Component({
  providers: [SelecionaDataComponent],
  selector: 'pacotes',
  templateUrl: './pacotes.component.html',
  styleUrls: ['./pacotes.component.css']
})

export class PacotesComponent implements OnInit {
  @ViewChild("selecionaDataHotel")
  private compData: SelecionaDataComponent

  @ViewChild("selecionaPessoasHotel")
  private compPessoa: SelecionaPessoasComponent

  @ViewChild("detalhesPacote")
  private detalhesPacote: DetalhesPacoteComponent;

  @ViewChild("telaMapaHotel")
  private telaMapaHotel: TelaMapaComponent

  @ViewChild("telaFiltroComp")
  private telaFiltroComp: TelaFiltrosComponent;

  constructor(public pacotesModel: PacotesModel) { };

  textoPesquisa = 'Pesquise um destino ou pacote';
  items: any = [];
  itemsOriginal: any = [];

  objFiltro: any = {};

  mostraDetalhesPacote = false;
  mostraProcuraLocal = false;
  mostraTelaFiltro = false;
  mostraTelaMapa = false;
  mostraSelecionaData = false;
  mostraFiltro = false;
  mostraPesquisarPacote = true;
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

  ngOnInit() {
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

  public qtdPessoasChange($event) {
    this.qtdHospedesPesquisa = $event.dados.qtdAdultos + $event.dados.qtdCriancas;
    this.qtdQuartosPesquisa = $event.dados.qtdQuartos;

    this.objFiltro.qtdQuartos = $event.dados.qtdQuartos;
    this.objFiltro.qtdAdultos = $event.dados.qtdAdultos;
    this.objFiltro.qtdCriancas = $event.dados.qtdCriancas;
    this.objFiltro.listaCriancas = $event.dados.listaCriancas;

    this.onFecharSelecionaPessoas();

    this.carregarRegistros();
  }

  public adicionaZero(val) {
    if (String(val).length == 1)
      return '0' + String(val);
    else
      return val;
  }

  public periodoSelecionado(evt) {
    this.dataInicio = evt.dados.dataInicio;
    var dt1 = evt.dados.dataInicio;
    var dtInicio = this.adicionaZero(dt1.getDate()) + '/' + this.adicionaZero((dt1.getMonth() + 1)) + '/' + dt1.getFullYear();

    this.dataFim = evt.dados.dataFim;
    var dt2 = evt.dados.dataFim;
    var dtFim = this.adicionaZero(dt2.getDate()) + '/' + this.adicionaZero((dt2.getMonth() + 1)) + '/' + dt2.getFullYear();

    this.valPeriodoSelecionado = dtInicio + ' - ' + dtFim;

    this.carregarRegistros();
  }

  public carregarRegistros() {
    if (!this.carregouFiltro)
      return;

    var me = this;
    me.mostrarCarregando();

    var lista:any = localStorage.getItem('listaPacotes');
    var lst:any = [];

    if(lista){
      var lst = JSON.parse(lista);
      me.itemsOriginal = lst;
      me.items = lst;
      me.filtroFiltroAplicado = false;
      me.telaFiltroComp.limparSelecao();
      me.fecharCarregando();
      return;
    }

    this.pacotesModel.pesquisaPacotes(this.objFiltro).then(function (result: any) {

      for (var t = 0; t < result.length; t++) {
        var item = result[t];
        item.foto = item.images.items[0].link;

        item.qtdPessoas = me.objFiltro.qtdAdultos + me.objFiltro.qtdCriancas;
/*
        var menorPreco = 0;
        var maiorPreco = 0;
        
        for (var k = 0; k < item.accommodations.items.length; k++) {
          me.qtdQuartos++;

          var quarto = item.accommodations.items[k];
          var preco = quarto.fares.items[0].averageDaily.base.amount;

          if (menorPreco == 0){
            menorPreco = preco;
            item.quarto = quarto;
          }
          else if (preco < menorPreco){
            menorPreco = preco;
            item.quarto = quarto;
          }

          if (maiorPreco == 0)
            maiorPreco = preco;
          else if (preco > maiorPreco)
            maiorPreco = preco;
        }
*/
        //item.lat = item.address.latitude;
        //item.lng = item.address.longitude;
        item.valor = item.fares.items[0].total.base.amount;
        //item.menorPreco = menorPreco;
        //item.maiorPreco = maiorPreco;

        //if (t == 0)
          //me.pontoLocalSelecionado = { lat: item.lat, lng: item.lng };
      }

      me.itemsOriginal = result;

      //localStorage.setItem('listaPacotes', JSON.stringify(me.itemsOriginal));

      me.items = result;
      me.filtroFiltroAplicado = false;
      me.telaFiltroComp.limparSelecao();
      me.fecharCarregando();
    });
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

  public onFiltroPacote(evt) {
    this.objFiltro = evt.dados;
/*
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
    */
    this.mostrarCarregando();
    this.carregouFiltro = true;

    var me = this;

    $('.filtroPacote').animate({ 'top': '100vh' }, 300, function () {
      $('.botaoVoltarHotel').css({ 'opacity': 1, 'margin-left': 0 });
      me.mostraPesquisarPacote = false;
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
      me.mostraPesquisarPacote = true;
      $('.filtroPacote').animate({ 'top': '0' }, 200);
    });
  }

  public selecionarPessoas() {
    this.compPessoa.inicializaValores({ listaCriancas: this.listaCriancasPesquisa, qtdQuartos: this.qtdQuartosPesquisa, qtdAdultos: this.qtdAdultosPesquisa, qtdCriancas: this.qtdCriancasPesquisa });

    this.mostraSelecionaPessoas = true;
    $('.botaoVoltarHotel').animate({ 'opacity': 0 }, 200);
    $('.selecionaPessoas').css({ 'top': '100vh' });
    $('.selecionaPessoas').animate({ 'top': '175' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public onFecharSelecionaPessoas() {
    var me = this;
    $('.selecionaPessoas').animate({ 'top': '100vh' }, 280, function () {
      $('.botaoVoltarHotel').animate({ 'opacity': 1 });
      me.mostraSelecionaPessoas = false;
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

  public selecionarData() {
    this.compData.inicializaValores({ dataInicio: this.dataInicio, dataFim: this.dataFim });

    this.mostraSelecionaData = true;

    $('.botaoVoltarHotel').animate({ 'opacity': 0 });
    $('.selecionaData').css({ 'margin-left': '100vw' });
    $('.selecionaData').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public itemSelecionado(item) {
    this.mostraDetalhesPacote = true;

    this.hotelSelecionado = item;

    $('.detalhes').css({ 'margin-left': '100vw' });
    $('.detalhes').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });

    item.dataInicio = this.dataInicio;
    item.dataFim = this.dataFim;
    this.detalhesPacote.inicializaPacote(item);
  }

  public onFecharDetalhes() {
    var me = this;
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.detalhes').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraProcuraLocal = false;
    });
  }

  public onFecharProcuraLocal() {
    var me = this;
    $('.botaoVoltarHotel').animate({ 'opacity': 1 });
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocal').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraDetalhesPacote = false;
    });
  }
}
