import { Component, Output, Input, OnInit, EventEmitter, NgModule, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import * as $ from "jquery";

@Component({
  selector: 'tela-filtros',
  templateUrl: './telaFiltros.component.html',
  styleUrls: ['./telaFiltros.component.css']
})

export class TelaFiltrosComponent implements OnInit {

  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  @Output() onFiltroAplicado: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.modoHotel') @Input() modoHotel: boolean;

  constructor() { }

  qtdPrecoSelecionado = 0;
  labelPrecoSelecionado = '';
  qtdDuracaoSelecionado = 0;
  labelDuracaoSelecionado = '';
  qtdRefeicaoSelecionado = 0;
  labelRefeicaoSelecionado = '';
  qtdPessoasSelecionado = 0;
  labelPessoasSelecionado = '';

  ordenacaoAberta = false;
  precoAberto = false;
  duracaoAberto = false;
  refeicoesAberto = false;
  pessoasAberto = false;

  listaPacotesGeral: any = [];
  listaPacotesSelec = [];

  ordem = 0;
  qtdQuartos = 0;

  qtdMarcados = 0;
  qtdMarcadosTotal = 0;

  pacotesSelecionados: any = [];
  objPacotesSelecionados = {};

  listaFiltroOrdenacao = [{ id: 101, label: 'Mais relevânvia', val: 1, selecionado: true },
  { id: 102, label: 'Menor preço', val: 2, selecionado: false },
  { id: 103, label: 'Maior preço', val: 3, selecionado: false }
  ];

  listaFiltroPreco = [{ id: 201, label: 'Até R$300,00', menorValor: 0, maiorValor: 300, val: 1, selecionado: false },
  { id: 202, label: 'R$300,01 - R$600,00', menorValor: 300.01, maiorValor: 600, val: 2, selecionado: false },
  { id: 203, label: 'R$600,01 - R$900,00', menorValor: 600.01, maiorValor: 900, val: 3, selecionado: false },
  { id: 204, label: 'R$900,01 - R$1200,00', menorValor: 900.01, maiorValor: 1200, val: 4, selecionado: false },
  { id: 205, label: 'R$1200,01 - R$1500,00', menorValor: 1200.01, maiorValor: 1500, val: 5, selecionado: false },
  { id: 206, label: 'R$1500,01 - R$1800,00', menorValor: 1500.01, maiorValor: 1800, val: 6, selecionado: false },
  { id: 207, label: 'R$1800,01 - R$2100,00', menorValor: 1800.01, maiorValor: 2100, val: 7, selecionado: false },
  { id: 208, label: 'R$2100,01 - R$2400,00', menorValor: 2100.01, maiorValor: 2400, val: 8, selecionado: false },
  { id: 209, label: 'R$2400,01 - R$2700,00', menorValor: 2400.01, maiorValor: 2700, val: 9, selecionado: false },
  { id: 2010, label: 'R$2700,01 - R$3000,00', menorValor: 2700.01, maiorValor: 3000, val: 10, selecionado: false },
  { id: 2011, label: 'Acima de R$3000,00', menorValor: 3000.01, maiorValor: 1000000, val: 11, selecionado: false }
  ];

  listaFiltroDiarias = [{ id: 301, label: '2 diárias', val: 2, selecionado: false },
  { id: 302, label: '3 diárias', val: 3, selecionado: false },
  { id: 303, label: '4 diárias', val: 4, selecionado: false },
  { id: 304, label: '5 diárias', val: 5, selecionado: false },
  { id: 305, label: '6 diárias', val: 6, selecionado: false },
  { id: 306, label: '7 diárias', val: 7, selecionado: false },
  { id: 307, label: '8 diárias', val: 8, selecionado: false },
  { id: 308, label: '9 diárias', val: 9, selecionado: false },
  { id: 309, label: '10 diárias', val: 10, selecionado: false },
  { id: 3010, label: '11 diárias', val: 11, selecionado: false },
  { id: 3011, label: '12 diárias', val: 12, selecionado: false }
  ];

  listaFiltroRefeicoes = [{ id: 401, label: 'All inclusive', val: 1, selecionado: false },
  { id: 402, label: 'Almoço', val: 2, selecionado: false },
  { id: 403, label: 'Café da manhã', val: 3, selecionado: false },
  { id: 404, label: 'Café da manhã, jantar', val: 4, selecionado: false },
  { id: 405, label: 'Jantar', val: 5, selecionado: false },
  { id: 406, label: 'Pensão completa', val: 6, selecionado: false }
  ];

  listaFiltroPessoas = [{ id: 501, label: '1', val: 1, selecionado: false },
  { id: 502, label: '2', val: 2, selecionado: false },
  { id: 503, label: '4', val: 4, selecionado: false }
  ];

  ngOnInit() {
    $('.ordenacaoAberto').css({ 'height': 0 });
    $('.precoAberto').css({ 'height': 0 });
    $('.duracaoAberto').css({ 'height': 0 });
    $('.refeicoesAberto').css({ 'height': 0 });
    $('.pessoasAberto').css({ 'height': 0 });
  }

  public itemOrdenacaoSelecionado() {

  }

  public clickSort() {
    this.pacotesSelecionados = this.pacotesSelecionados.sort((a, b) => {
      return a.valor > b.valor;
    });
  }

  public abrirOrdenacao() {
    this.ordenacaoAberta = !this.ordenacaoAberta;

    if (!this.ordenacaoAberta) {
      $('.ordenacaoAberto').css({ 'height': 0 });
      $('.icoSetaOrdenacao').css({ 'transform': 'rotate(0deg)' });
    }
    else {
      $('.ordenacaoAberto').css({ 'height': 'auto' });
      $('.icoSetaOrdenacao').css({ 'transform': 'rotate(180deg)' });
    }
  }

  public abrirPreco() {
    this.precoAberto = !this.precoAberto;

    if (!this.precoAberto) {
      $('.precoAberto').css({ 'height': 0 });
      $('.icoSetaPreco').css({ 'transform': 'rotate(0deg)' });
    }
    else {
      $('.precoAberto').css({ 'height': 'auto' });
      $('.icoSetaPreco').css({ 'transform': 'rotate(180deg)' });
    }
  }

  public abrirDuracao() {
    this.duracaoAberto = !this.duracaoAberto;

    if (!this.duracaoAberto) {
      $('.duracaoAberto').css({ 'height': 0 });
      $('.icoSetaDuracao').css({ 'transform': 'rotate(0deg)' });
    }
    else {
      $('.duracaoAberto').css({ 'height': 'auto' });
      $('.icoSetaDuracao').css({ 'transform': 'rotate(180deg)' });
    }
  }

  public abrirRefeicoes() {
    this.refeicoesAberto = !this.refeicoesAberto;

    if (!this.refeicoesAberto) {
      $('.refeicoesAberto').css({ 'height': 0 });
      $('.icoSetaRefeicoes').css({ 'transform': 'rotate(0deg)' });
    }
    else {
      $('.refeicoesAberto').css({ 'height': 'auto' });
      $('.icoSetaRefeicoes').css({ 'transform': 'rotate(180deg)' });
    }
  }

  public abrirPessoas() {
    this.pessoasAberto = !this.pessoasAberto;

    if (!this.pessoasAberto) {
      $('.pessoasAberto').css({ 'height': 0 });
      $('.icoSetaPessoas').css({ 'transform': 'rotate(0deg)' });
    }
    else {
      $('.pessoasAberto').css({ 'height': 'auto' });
      $('.icoSetaPessoas').css({ 'transform': 'rotate(180deg)' });
    }
  }

  public limparSelecao() {
    this.pacotesSelecionados = [];

    this.qtdPrecoSelecionado = 0;
    this.labelPrecoSelecionado = '';
    this.qtdDuracaoSelecionado = 0;
    this.labelDuracaoSelecionado = '';
    this.qtdRefeicaoSelecionado = 0;
    this.labelRefeicaoSelecionado = '';
    this.qtdPessoasSelecionado = 0;
    this.labelPessoasSelecionado = '';
    this.qtdMarcadosTotal = 0;

    for (var k = 0; k < this.listaFiltroPreco.length; k++) {
      this.listaFiltroPreco[k]['selecionado'] = false;
    }

    for (var k = 0; k < this.listaFiltroDiarias.length; k++) {
      this.listaFiltroDiarias[k]['selecionado'] = false;
    }

    for (var k = 0; k < this.listaFiltroPessoas.length; k++) {
      this.listaFiltroPessoas[k]['selecionado'] = false;
    }
  }

  public montarTotais() {
    this.pacotesSelecionados = [];
    this.objPacotesSelecionados = {};

    for (var t = 0; t < this.listaFiltroPessoas.length; t++) {
      if (this.listaFiltroPessoas[t].selecionado) {
        for (var w = 0; w < this.listaFiltroPessoas[t]['pacotes'].length; w++) {
          this.objPacotesSelecionados[this.listaFiltroPessoas[t]['pacotes'][w]['id']] = this.listaFiltroPessoas[t]['pacotes'][w];
        }
      }
    }

    for (var t = 0; t < this.listaFiltroPreco.length; t++) {
      if (this.listaFiltroPreco[t].selecionado) {
        for (var w = 0; w < this.listaFiltroPreco[t]['pacotes'].length; w++) {
          this.objPacotesSelecionados[this.listaFiltroPreco[t]['pacotes'][w]['code']] = this.listaFiltroPreco[t]['pacotes'][w];
        }
      }
    }

    for (var t = 0; t < this.listaFiltroDiarias.length; t++) {
      if (this.listaFiltroDiarias[t].selecionado) {
        for (var w = 0; w < this.listaFiltroDiarias[t]['pacotes'].length; w++) {
          this.objPacotesSelecionados[this.listaFiltroDiarias[t]['pacotes'][w]['id']] = this.listaFiltroDiarias[t]['pacotes'][w];
        }
      }
    }

    for (var property in this.objPacotesSelecionados) {
      this.pacotesSelecionados.push(this.objPacotesSelecionados[property]);
    }
  }

  public ordenar(id) {
    this.ordem = id;
  }

  public aplicarFiltro(evt) {
    if (this.qtdMarcadosTotal == 0) {
      var me = this;
      let listaOrdenada = [];
      if (me.ordem == 2) {
        listaOrdenada = this.listaPacotesGeral.sort((a, b) => {
          return a.valor - b.valor;
        });
      }
      else if (me.ordem == 3) {
        listaOrdenada = this.listaPacotesGeral.sort((a, b) => {
          return b.valor - a.valor;
        });
      }
      else {
        listaOrdenada = this.listaPacotesGeral;
      }
      this.onFiltroAplicado.emit({ event: evt, pacotes: listaOrdenada, filtroAplicado: false });
    }
    else {
      this.montarTotais();
      var me = this;
      let listaOrdenada = [];
      if (me.ordem == 2) {
        listaOrdenada = this.pacotesSelecionados.sort((a, b) => {
          return a.valor - b.valor;
        });
      }
      else if (me.ordem == 3) {
        listaOrdenada = this.pacotesSelecionados.sort((a, b) => {
          return b.valor - a.valor;
        });
      }
      else {
        listaOrdenada = this.pacotesSelecionados;
      }
      this.onFiltroAplicado.emit({ event: evt, pacotes: this.pacotesSelecionados, filtroAplicado: this.qtdMarcadosTotal > 0 });
    }

    this.onFechar.emit(null);
  }

  public itemPessoasSelecionado() {
    this.qtdPessoasSelecionado = 0;
    var me = this;

    for (var t = 0; t < this.listaFiltroPessoas.length; t++) {
      if (this.listaFiltroPessoas[t].selecionado)
        this.qtdPessoasSelecionado++;
    }

    this.calculaTotais();

    this.labelPessoasSelecionado = (this.qtdPessoasSelecionado == 1) ? 'selecionado' : 'selecionados';
  }

  public itemRefeicaoSelecionado() {
    this.qtdRefeicaoSelecionado = 0;
    for (var t = 0; t < this.listaFiltroRefeicoes.length; t++) {
      if (this.listaFiltroRefeicoes[t].selecionado)
        this.qtdRefeicaoSelecionado++;
    }

    this.calculaTotais();

    this.labelRefeicaoSelecionado = (this.qtdRefeicaoSelecionado == 1) ? 'selecionado' : 'selecionados';
  }

  public itemDuracaoSelecionado() {
    this.qtdDuracaoSelecionado = 0;
    for (var t = 0; t < this.listaFiltroDiarias.length; t++) {
      if (this.listaFiltroDiarias[t].selecionado)
        this.qtdDuracaoSelecionado++;
    }

    this.calculaTotais();

    this.labelDuracaoSelecionado = (this.qtdDuracaoSelecionado == 1) ? 'selecionado' : 'selecionados';
  }

  public itemPrecoSelecionado() {
    this.qtdPrecoSelecionado = 0;
    for (var t = 0; t < this.listaFiltroPreco.length; t++) {
      if (this.listaFiltroPreco[t].selecionado)
        this.qtdPrecoSelecionado += this.listaFiltroPreco[t]['pacotes'].length;
    }

    this.calculaTotais();

    this.labelPrecoSelecionado = (this.qtdPrecoSelecionado == 1) ? 'selecionado' : 'selecionados';
  }

  public calculaTotais() {
    this.qtdMarcadosTotal = this.qtdPrecoSelecionado + this.qtdDuracaoSelecionado + this.qtdRefeicaoSelecionado + this.qtdPessoasSelecionado;
    this.montarTotais();
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }

  public setPacotes(arg) {
    this.listaPacotesGeral = [];

    for (var k = 0; k < arg.length; k++) {
      this.listaPacotesGeral.push(arg[k]);
    }

    for (var k = 0; k < this.listaFiltroPreco.length; k++) {
      this.listaFiltroPreco[k]['qtd'] = 0;
      this.listaFiltroPreco[k]['pacotes'] = [];
    }

    for (var k = 0; k < this.listaFiltroDiarias.length; k++) {
      this.listaFiltroDiarias[k]['qtd'] = 0;
      this.listaFiltroDiarias[k]['pacotes'] = [];
    }

    for (var k = 0; k < this.listaFiltroPessoas.length; k++) {
      this.listaFiltroPessoas[k]['qtd'] = 0;
      this.listaFiltroPessoas[k]['pacotes'] = [];
    }

    //Verifica Preços
    this.qtdQuartos = 0;

    for (var k = 0; k < this.listaFiltroPreco.length; k++) {
      for (var w = 0; w < this.listaPacotesGeral.length; w++) {
        var quartos = this.listaPacotesGeral[w].accommodations.items;
        for (var t = 0; t < quartos.length; t++) {
          
          var menorValor = this.listaFiltroPreco[k].menorValor;
          var maiorValor = this.listaFiltroPreco[k].maiorValor;
          var valor = quartos[t].fares.items[0].averageDaily.base.amount;
          if (valor >= menorValor && valor <= maiorValor) {
            this.qtdQuartos++;

            this.listaPacotesGeral[w].quarto = quartos[t];
            this.listaFiltroPreco[k]['pacotes'].push(this.listaPacotesGeral[w]);
            this.listaFiltroPreco[k]['qtd']++;
          }
        }

      }
    }

    //Verifica Refeicoes
    for (var k = 0; k < this.listaFiltroRefeicoes.length; k++) {
      for (var w = 0; w < this.listaPacotesGeral.length; w++) {
        var valor = this.listaPacotesGeral[w].valor;
        if (valor >= menorValor && valor <= maiorValor) {
          this.listaFiltroRefeicoes[k]['pacotes'].push(this.listaPacotesGeral[w]);
          this.listaFiltroRefeicoes[k]['qtd']++;
        }
      }
    }

    //Verifica Diarias
    for (var k = 0; k < this.listaFiltroDiarias.length; k++) {
      for (var w = 0; w < this.listaPacotesGeral.length; w++) {
        var diaria = this.listaFiltroDiarias[k].val;
        var qtdDiarias = this.listaPacotesGeral[w].qtdDiarias;

        if (diaria == qtdDiarias) {
          this.listaFiltroDiarias[k]['pacotes'].push(this.listaPacotesGeral[w]);
          this.listaFiltroDiarias[k]['qtd']++;
        }
      }
    }

    //Verifica Pessoas
    for (var k = 0; k < this.listaFiltroPessoas.length; k++) {
      for (var w = 0; w < this.listaPacotesGeral.length; w++) {
        var pessoas = this.listaFiltroPessoas[k].val;
        var qtdPessoas = this.listaPacotesGeral[w].qtdPessoas;

        if (pessoas == qtdPessoas) {
          this.listaFiltroPessoas[k]['pacotes'].push(this.listaPacotesGeral[w]);
          this.listaFiltroPessoas[k]['qtd']++;
        }
      }
    }
  }
}
