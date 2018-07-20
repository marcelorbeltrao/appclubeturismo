import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgClass } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetalhesPacoteComponent } from '../../components/detalhesPacote/detalhesPacote.component';
import { ProcuraLocalComponent } from '../../components/procuraLocal/procuraLocal.component';
import { SelecionaDataComponent } from '../../components/selecionaData/selecionaData.component';
import { SelecionaPessoasComponent } from '../../components/selecionaPessoas/selecionaPessoas.component';

import * as $ from "jquery";

@Component({
  selector: 'destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaqueComponent implements OnInit {

  items = [];
  mostraDetalhesPacote = false;
  mostrandoHoteis = true;
  mostraProcuraLocal = false;
  mostraSelecionaData = false;
  mostraSelecionaPessoas = false;
  pacoteSelecionado = {};
  valPeriodoSelecionado = '';

  qtdHospedesPesquisa = 2;
  qtdQuartosPesquisa = 1;

  mostraCarregando = false;

  textoPesquisa = 'Selecione uma cidade';

  ngOnInit() {
    this.items.push({ id:1, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'Aéreo + Hotel + Café da Manhã', valor:649, qtdDiarias:7, qtdPessoas:1, desconto:25});
    this.items.push({ id:2, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Foz do Iguaçu', titulo: 'Aéreo + Hotel com 7 diárias', valor:579, qtdDiarias:7, qtdPessoas:1, desconto:0 });
    this.items.push({ id:3, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'cc', valor:100, qtdDiarias:7, qtdPessoas:2, desconto:0 });
    this.items.push({ id:4, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'aa', valor:100, qtdDiarias:7, qtdPessoas:1, desconto:0 });
    this.items.push({ id:5, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'bb', valor:2000, qtdDiarias:5, qtdPessoas:1, desconto:30 });
    this.items.push({ id:6, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'cc', valor:100, qtdDiarias:7, qtdPessoas:1, desconto:0 });
    this.items.push({ id:7, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'aa', valor:100, qtdDiarias:7, qtdPessoas:2, desconto:0 });
    this.items.push({ id:8, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'bb', valor:100, qtdDiarias:7, qtdPessoas:4, desconto:0 });
    this.items.push({ id:9, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'cc', valor:100, qtdDiarias:3, qtdPessoas:1, desconto:15 });
    this.items.push({ id:10, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'aa', valor:100, qtdDiarias:7, qtdPessoas:4, desconto:0 });
    this.items.push({ id:11, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'bb', valor:800, qtdDiarias:7, qtdPessoas:1, desconto:0 });
    this.items.push({ id:12, lat:-8.4933763, lng:-35.0098749, periodo:'01 mar 19 a 30 nov 19', local:'Porto de Galinha', titulo: 'cc', valor:100, qtdDiarias:7, qtdPessoas:1, desconto:0 });
    
    $('.camposHotel').css({ 'height': 90 });

    this.mostrarHoteis();
    this.pesquisarDestaques();
  }

  public getLimits (array) {
    return [
        Math.floor(array.length / 2) + 1,
        -Math.floor(array.length / 2)
    ];
  };


  public mostrarCarregando() {
    this.mostraCarregando = true;

    $('.icoCarregando').css({ 'padding-top': '80px' });
    $('.icoCarregando').animate({ 'padding-top': '0px' });

    var me = this;
    setTimeout(function () {
      me.fecharCarregando();
    }, 1000)
  }

  public fecharCarregando() {
    this.mostraCarregando = false;
  }


  public pesquisarDestaques() {
    this.mostrarCarregando();
  }

  public qtdPessoasChange($event) {
    this.qtdHospedesPesquisa = $event.dados.qtdPessoas;
    this.qtdQuartosPesquisa = $event.dados.qtdQuartos;

    this.onFecharSelecionaPessoas();
    this.mostrarCarregando();
  }

  public itemSelecionado(item) {
    this.mostraDetalhesPacote = true;

    this.pacoteSelecionado = item;

    $('.detalhes').css({ 'margin-left': '100vw' });
    $('.detalhes').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
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
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocal').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraDetalhesPacote = false;
    });
  }

  public onFecharSelecionaData() {
    var me = this;
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionaData').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraSelecionaData = false;
    });
  }

  public onFecharSelecionaPessoas() {
    var me = this;
    $('.selecionaPessoas').animate({ 'top': '2000px' }, 200, function () {
      me.mostraSelecionaPessoas = false;
    });
  }

  public mostrarHoteis() {
    this.textoPesquisa = 'Selecione uma cidade';
    $('.campoPesquisa').animate({ 'padding-left': 32 }, function () {
      $('.iconeSearchGD').animate({ 'opacity': 1 });
    });

    $('.camposHotel').animate({ 'height': 90 });
    $('.camposHotel').animate({ 'opacity': 1 });

    $('.botaoPesquisarPeq').animate({ 'opacity': 0 }, function () {
      $('.campoPesquisa').css({ 'padding-right': 10 });
      
    });

    $('.campoProcurar').css({ 'padding-left': 28 });


    var me = this;

    me.mostrandoHoteis = this.mostrandoHoteis;

    setTimeout(function () {
      me.mostrandoHoteis = true;
    }, 500, this);
  }

  public mostrarPacotes() {
    $('.iconeSearchGD').animate({ 'opacity': 0 });


    this.textoPesquisa = 'Pesquise um destino ou pacote';

    this.mostrandoHoteis = false;
    $('.camposHotel').animate({ 'opacity': 0 }, function () {
      $('.campoPesquisa').css({ 'padding-left': 10 });
      $('.campoPesquisa').css({ 'padding-right': 50 });
      $('.botaoPesquisarPeq').animate({ 'opacity': 1 });
      $('.camposHotel').animate({ 'height': 0 });
      $('.campoPesquisa').animate({ 'padding-left': 10 });
    });
  }

  public selecionarLocal() {
    this.mostraProcuraLocal = true;
    $('.procuraLocal').css({ 'margin-left': '100vw' });
    $('.procuraLocal').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public selecionarData() {
    this.mostraSelecionaData = true;
    $('.selecionaData').css({ 'margin-left': '100vw' });
    $('.selecionaData').animate({ 'margin-left': '0' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public selecionarPessoas() {
    this.mostraSelecionaPessoas = true;
    $('.selecionaPessoas').css({ 'top': '100vh' });
    $('.selecionaPessoas').animate({ 'top': '175' }, 200, function () {
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public adicionaZero(val) {
    if (String(val).length == 1)
      return '0' + String(val);
    else
      return val;
  }

  public localSelecionado(evt) {
    this.textoPesquisa = evt.dados.formatted_address;

    this.mostrarCarregando();
  }

  public periodoSelecionado(evt) {
    var dt1 = evt.dados.dataInicio;
    var dtInicio = this.adicionaZero(dt1.getDate()) + '/' + this.adicionaZero((dt1.getMonth() + 1)) + '/' + dt1.getFullYear();

    var dt2 = evt.dados.dataFim;
    var dtFim = this.adicionaZero(dt2.getDate()) + '/' + this.adicionaZero((dt2.getMonth() + 1)) + '/' + dt2.getFullYear();

    this.valPeriodoSelecionado = dtInicio + ' - ' + dtFim;

    this.mostrarCarregando();
  }
}
