import { Component, ViewChild, Output, Input, OnInit, EventEmitter, NgModule, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResumoSelecaoComponent } from '../../components/resumoSelecao/resumoSelecao.component';
import { SelecionarQuartosPacoteComponent } from '../../components/selecionarQuartosPacote/selecionarQuartosPacote.component';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { ImageZoomModule } from 'angular2-image-zoom';
import { AgmCoreModule } from '@agm/core';
import { DetalhesPacoteModel } from '../../components/detalhesPacote/detalhesPacote.model';
import { HoteisModel } from '../../modulos/hoteis/hoteis.model';
import { SelecioneDiaComponent } from '../../components/selecioneDia/selecioneDia.component';

import * as $ from "jquery";
import { SwiperComponent } from '../swiper/swiper.component';
import { ListaHoteisPacotesComponent } from '../../components/listaHoteisPacotes/listaHoteisPacotes.component';


@Component({
  selector: 'detalhes-pacote',
  templateUrl: './detalhesPacote.component.html',
  styleUrls: ['./detalhesPacote.component.css']
})

export class DetalhesPacoteComponent implements OnInit {

  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  @ViewChild("resumoSelecao") resumoSelecao: ResumoSelecaoComponent;
  @ViewChild("selecionarHoteis") selecionarHoteis: ListaHoteisPacotesComponent;
  @ViewChild("selecioneDia") selecioneDia: SelecioneDiaComponent;
  @ViewChild("selecionarQuartosPacote") selecionarQuartosPacote: SelecionarQuartosPacoteComponent;
  @ViewChild("swiper2") swiper: SwiperComponent;

  @ViewChild('gmapElement') gmapElement: any;
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  map: google.maps.Map;
  markers: any = [];
  pacote: any = {};
  exp: boolean = true;
  textBotao: string = 'Mostrar mais';
  imagens: any = [];
  lat: number = 15.8429235;
  lng: number = -48.0328425;

  apiGallery: any = null;

  hotelSelecionado: any = {};
  quartoSelecionado: any = { fares: { items: [] } };
  itinerario: any = []
  documentacao: any = [];
  observacoes: any = [];

  mostraFotos = false;

  diasDisponiveis = [];
  servicosIncluidos: any = [];
  mostraDescricao = false;
  mostraItinerario = false;
  mostraDocumentacao = false;
  mostraObservacoes = false;
  mostraCarregando = true;
  mostraListaQuartos = false;
  mostraSelecioneDia = false;
  mostraVoo = false;
  mostrandoServicos = false;
  mostrandoDocumentacao = false;
  mostrandoRoteiro = false;
  mostrandoObservacoes = false;
  aereoSelecionado: any = {};

  mostraListaHoteis = false;
  possuiHotel = false;
  possuiTraslado = false;
  possuiPasseio = false;
  possuiAviao = false;

  dadosVooIda = { departureAirport: {}, arrivalAirport: {} };
  dadosVooVolta = { departureAirport: {}, arrivalAirport: {} };

  mostraSelecionarQuartos = false;
  mostraResumoSelecao = false;
  listaRegulamentos = [];
  conf: GALLERY_CONF = {};
  quartos: any = [];
  hoteis: any = [];
  meObjHoteis: any = {};
  listaHoteis: any = [];

  constructor(public pacotesModel: DetalhesPacoteModel, public hotelModel: HoteisModel) { }

  ngOnInit() {

    this.listaRegulamentos.push({ id: 1, label: 'Conheça o pacote', conteudo: '' });
    this.listaRegulamentos.push({ id: 2, label: 'Dados do voo', conteudo: '' });
    this.listaRegulamentos.push({ id: 3, label: 'Tipo de acomodação', conteudo: '' });
    this.listaRegulamentos.push({ id: 4, label: 'Regras para crianças', conteudo: '' });
    this.listaRegulamentos.push({ id: 5, label: 'Período válido para viajar', conteudo: '' });
    this.listaRegulamentos.push({ id: 6, label: 'Documentos para viajar', conteudo: '' });
    this.listaRegulamentos.push({ id: 7, label: 'Horário de entrada e saída do hotel', conteudo: '' });


  }


  public inicializaPacote(pacote, dia) {
    $('.camposDetalhes').scrollTop(0);

    this.swiper.setIndex(0);
    this.imagens = [];
    this.meObjHoteis = {};

    for (var t = 0; t < pacote.images.items.length; t++) {
      var img = pacote.images.items[t].link;
      var tituloFoto = pacote.images.items[0].title;
      this.imagens.push(
        {
          path: img
        })
    }

    this.mostraFotos = (this.imagens.length > 0);

    var me = this;

    me.possuiHotel = false;
    me.possuiTraslado = false;
    me.possuiPasseio = false;
    me.possuiAviao = false;

    for (var t = 0; t < pacote.includedServices.length; t++) {
      var itm = pacote.includedServices[t];

      switch (itm) {
        case 'Hotel':
          me.possuiHotel = true;
          break;
        case 'Transfer':
          me.possuiTraslado = true;
          break;
        case 'Ride':
          me.possuiPasseio = true;
          break;
        case 'Flight':
          me.possuiAviao = true;
          break;
      }
    }

    me.mostraCarregando = true;

    me.mostrandoServicos = false;
    me.mostrandoDocumentacao = false;
    me.mostrandoRoteiro = false;
    me.mostrandoObservacoes = false;
    me.mostraVoo = false;

    $('.listaServicosIncluidos').css({ height: 0, 'margin-bottom': -10 });
    $('.listaServicosIncluidos').css({ opacity: 0 });
    $('.icoAbrirServicos').css({ transform: 'rotate(0deg)' });

    $('.listaDocumentacao').css({ height: 0, 'margin-bottom': -10 });
    $('.listaDocumentacao').css({ opacity: 0 });
    $('.icoAbrirDocumentacao').css({ transform: 'rotate(0deg)' });

    $('.listaRoteiro').css({ height: 0, 'margin-bottom': -10 });
    $('.listaRoteiro').css({ opacity: 0 });
    $('.icoAbrirRoteiro').css({ transform: 'rotate(0deg)' });

    $('.listaObservacoes').css({ height: 0, 'margin-bottom': -10 });
    $('.listaObservacoes').css({ opacity: 0 });
    $('.icoAbrirObservacoes').css({ transform: 'rotate(0deg)' });

    if(dia)
      pacote.departureDate = dia;
    else{
      pacote.departureDate = pacote.diasDisponiveis[0];
      me.diasDisponiveis = pacote.diasDisponiveis;
    }

    me.pacote = pacote;

    this.pacotesModel.pesquisarPacote(pacote).then(function (result: any) {
      let qtdAdultos = me.pacote.qtdAdultos;
      let qtdCriancas = me.pacote.qtdCriancas;
      let listaCriancas = me.pacote.listaCriancas;
     
      me.pacote = result;
      me.pacote.qtdAdultos = qtdAdultos;
      me.pacote.qtdCriancas = qtdCriancas;
      me.pacote.listaCriancas = listaCriancas;
      me.pacote.mostraHotel = false;
      me.pacote.qtdDiarias = result.nights;
      me.pacote.qtdPessoas = qtdAdultos + qtdCriancas;
      me.pacote.description = result.content.description;

      me.mostraDescricao = (me.pacote.description.length > 0);

      me.pacote.valor = me.pacote.fares.items[0].total.base.amount;

      if (!me.pacote.content['documents'])
        me.mostraDocumentacao = false;
      else {
        me.documentacao = me.pacote.content.documents.items;
        me.mostraDocumentacao = true;
      }

      if (!me.pacote.content['remarks'])
        me.mostraObservacoes = false;
      else {
        me.observacoes = me.pacote.content.remarks.items;
        me.mostraObservacoes = true;
      }

      if (!me.pacote['travelPlan'])
        me.mostraItinerario = false;
      else {
        me.itinerario = me.pacote.travelPlan.items;
        me.mostraItinerario = true;
      }

      me.servicosIncluidos = me.pacote.content.includedItems.items;

      if (result['options']) {

        me.hoteis = result.options.items;

        for (var t = 0; t < me.hoteis.length; t++) {
          var ho = me.hoteis[t].hotels.items[0];

          if (!me.meObjHoteis[ho.name])
            me.meObjHoteis[ho.name] = { quartos: [me.hoteis[t]] };
          else
            me.meObjHoteis[ho.name].quartos.push(me.hoteis[t]);
        }

        me.listaHoteis = [];
        for (var prop in me.meObjHoteis) {
          me.listaHoteis.push({ hotel: me.meObjHoteis[prop].quartos[0], quartos: me.meObjHoteis[prop].quartos })
        }

        me.hotelSelecionado = me.hoteis[0].hotels.items[0];

        me.quartos = me.meObjHoteis[me.hotelSelecionado.name].quartos;

        me.hotelSelecionado.foto = me.hotelSelecionado.images.items[0].link;
        me.hotelSelecionado.lat = me.hotelSelecionado.address['latitude'];
        me.hotelSelecionado.lng = me.hotelSelecionado.address['longitude'];
        me.hotelSelecionado.endereco = me.hotelSelecionado.address['street'];
        me.hotelSelecionado.cidade = me.hotelSelecionado.address['city'].name;
        me.hotelSelecionado.zipCode = me.hotelSelecionado.address['zipCode'];
        me.hotelSelecionado.quartos = me.hotelSelecionado['accommodations'].items;
        me.pacote.mostraHotel = true;

        me.pacote.valor = me.hoteis[0].fares.items[0].fare.base.amount;

        if (me.hotelSelecionado['stars'] == 1) {
          me.hotelSelecionado['mostraEstrela1'] = true;
        }
        if (me.hotelSelecionado['stars'] == 1.5) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela15'] = true;
        }
        if (me.hotelSelecionado['stars'] == 2) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
        }
        if (me.hotelSelecionado['stars'] == 2.5) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela25'] = true;
        }
        if (me.hotelSelecionado['stars'] == 3) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela3'] = true;
        }
        if (me.hotelSelecionado['stars'] == 3.5) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela3'] = true;
          me.hotelSelecionado['mostraEstrela35'] = true;
        }
        if (me.hotelSelecionado['stars'] == 4) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela3'] = true;
          me.hotelSelecionado['mostraEstrela4'] = true;
        }
        if (me.hotelSelecionado['stars'] == 4.5) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela3'] = true;
          me.hotelSelecionado['mostraEstrela4'] = true;
          me.hotelSelecionado['mostraEstrela45'] = true;
        }
        if (me.hotelSelecionado['stars'] >= 5) {
          me.hotelSelecionado['mostraEstrela1'] = true;
          me.hotelSelecionado['mostraEstrela2'] = true;
          me.hotelSelecionado['mostraEstrela3'] = true;
          me.hotelSelecionado['mostraEstrela4'] = true;
          me.hotelSelecionado['mostraEstrela5'] = true;
        }

        if (me.hoteis[0].flights.items.length > 0) {
          me.mostraVoo = true;

          me.aereoSelecionado = me.hoteis[0].flights.items[0];

          me.aereoSelecionado.empresaAereaIda = me.aereoSelecionado.itineraries.items[0].segments.items[0].operatingAirline;
          me.aereoSelecionado.empresaAereaVolta = me.aereoSelecionado.itineraries.items[1].segments.items[0].operatingAirline;
          me.aereoSelecionado.logoIda = me.aereoSelecionado.empresaAereaIda.logo;
          me.aereoSelecionado.logoVolta = me.aereoSelecionado.empresaAereaVolta.logo;

          me.dadosVooIda = me.aereoSelecionado.itineraries.items[0].segments.items[0];
          me.dadosVooVolta = me.aereoSelecionado.itineraries.items[1].segments.items[0];
        }

        me.quartoSelecionado = me.hoteis[0].fares.items[0].accommodations.items[0];
        me.quartoSelecionado.nomeQuarto = me.quartoSelecionado.name;
        me.quartoSelecionado.tipoComida = me.quartoSelecionado.fares.items[0].mealPlan.name;

        //let hot = me.hotelModel.pesquisaHotel(me.hotelSelecionado.track);
      }

      me.mostraCarregando = false;
    });
  }

  public onDiaSelecionado(dia){
    this.mostraCarregando = true;
    this.inicializaPacote(this.pacote, dia.dados);
  }

  public onQuartoClick(evt) {
    this.quartoSelecionado = evt.data;
    this.quartoSelecionado.tipoComida = evt.data.mealPlan;
    this.pacote.valor = this.quartoSelecionado.fares.items[0].fare.base.amount;
  }

  public abrirListaDia() {
    this.mostraSelecioneDia = true;
    $('.selecioneDia').css({ 'left': '100vw' });
    $('.selecioneDia').animate({ 'left': '0' }, 200, function () {
      $('.selecioneDia .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });

    this.selecioneDia.inicializa(this.diasDisponiveis, this.pacote.departureDate);
  }

  public onFechaListaDia() {
    var me = this;
    $('.selecioneDia .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecioneDia').animate({ 'left': '100vw' }, 200, function () {
      me.mostraSelecioneDia = false;
    });
  }

  public abrirListaQuartos() {
    this.mostraListaQuartos = true;
    $('.selecionarQuartosPacote').css({ 'left': '100vw' });
    $('.selecionarQuartosPacote').animate({ 'left': '0' }, 200, function () {
      $('.selecionarQuartosPacote .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });

    this.selecionarQuartosPacote.setQuartos(this.quartos, this.pacote.qtdPessoas);
  }

  public onFecharSelecionarQuartos() {
    var me = this;
    $('.selecionarQuartosPacote .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionarQuartosPacote').animate({ 'left': '100vw' }, 200, function () {
      me.mostraListaQuartos = false;
    });
  }

  public abrirListaHoteis() {
    this.mostraListaHoteis = true;
    $('.selecionarHoteis').css({ 'left': '100vw' });
    $('.selecionarHoteis').animate({ 'left': '0' }, 200, function () {
      $('.selecionarHoteis .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });

    this.selecionarHoteis.setListaHoteis(this.listaHoteis, this.pacote.qtdPessoas);
  }

  public onHotelSelecionado(evt) {
    this.hotelSelecionado = evt.data.hotel;
    this.hotelSelecionado.foto = this.hotelSelecionado.photo;
    this.hotelSelecionado.checkin = evt.data.quartos[0].hotels.items[0].checkin;
    this.hotelSelecionado.checkout = evt.data.quartos[0].hotels.items[0].checkout;

    this.quartoSelecionado = evt.data.quartos[0].fares.items[0].accommodations.items[0];
    this.quartoSelecionado.tipoComida = evt.data.quartos[0].fares.items[0].accommodations.items[0].fares.items[0].mealPlan.name;

    this.pacote.valor = evt.data.quartos[0].fares.items[0].fare.base.amount;

    this.quartos = evt.data.quartos;
  }

  public onFecharSelecionarHoteis() {
    var me = this;
    $('.selecionarHoteis .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionarHoteis').animate({ 'left': '100vw' }, 200, function () {
      me.mostraListaHoteis = false;
    });
  }

  public abrirServicos() {
    if (!this.mostrandoServicos) {
      this.mostrandoServicos = true;
      $('.listaServicosIncluidos').css({ height: 'auto', 'margin-bottom': 20 });
      $('.listaServicosIncluidos').animate({ opacity: 1 }, 200);
      $('.icoAbrirServicos').css({ transform: 'rotate(180deg)' });
    }

    else {
      this.mostrandoServicos = false;
      $('.listaServicosIncluidos').animate({ opacity: 0 }, 200, function () {
        $('.listaServicosIncluidos').css({ height: '0', 'margin-bottom': -10 });
        $('.icoAbrirServicos').css({ transform: 'rotate(0deg)' });
      });
    }
  }

  public abrirDocumentacao() {
    if (!this.mostrandoDocumentacao) {
      this.mostrandoDocumentacao = true;
      $('.listaDocumentacao').css({ height: 'auto', 'margin-bottom': 20 });
      $('.listaDocumentacao').animate({ opacity: 1 }, 200);
      $('.icoAbrirDocumentacao').css({ transform: 'rotate(180deg)' });
    }

    else {
      this.mostrandoDocumentacao = false;
      $('.listaDocumentacao').animate({ opacity: 0 }, 200, function () {
        $('.listaDocumentacao').css({ height: '0', 'margin-bottom': -10 });
        $('.icoAbrirDocumentacao').css({ transform: 'rotate(0deg)' });
      });
    }
  }

  public abrirRoteiro() {
    if (!this.mostrandoRoteiro) {
      this.mostrandoRoteiro = true;
      $('.listaRoteiro').css({ height: 'auto', 'margin-bottom': 20 });
      $('.listaRoteiro').animate({ opacity: 1 }, 200);
      $('.icoAbrirRoteiro').css({ transform: 'rotate(180deg)' });
    }

    else {
      this.mostrandoRoteiro = false;
      $('.listaRoteiro').animate({ opacity: 0 }, 200, function () {
        $('.listaRoteiro').css({ height: '0', 'margin-bottom': -10 });
        $('.icoAbrirRoteiro').css({ transform: 'rotate(0deg)' });
      });
    }
  }

  public abrirObservacoes() {
    if (!this.mostrandoObservacoes) {
      this.mostrandoObservacoes = true;
      $('.listaObservacoes').css({ height: 'auto', 'margin-bottom': 20 });
      $('.listaObservacoes').animate({ opacity: 1 }, 200);
      $('.icoAbrirObservacoes').css({ transform: 'rotate(180deg)' });
    }

    else {
      this.mostrandoObservacoes = false;
      $('.listaObservacoes').animate({ opacity: 0 }, 200, function () {
        $('.listaObservacoes').css({ height: '0', 'margin-bottom': -10 });
        $('.icoAbrirObservacoes').css({ transform: 'rotate(0deg)' });
      });
    }
  }



  public abrirFullScreen() {

  }

  public mostrarMaisClick() {
    this.exp = !this.exp;

    if (!this.exp) {
      $('.descricaopacote').css({ 'height': 'auto' });
      this.textBotao = 'Mostrar menos';
    }
    else {
      $('.descricaopacote').css({ 'height': '66px' });
      this.textBotao = 'Mostrar mais';
    }

  }

  public onSelecionarQuartos() {
    // this.selecionarQuartos.setQuartos(this.quartos, this.hotel);
    this.mostrarSelecionarQuartos();
  }

  public onSelecionarPacote() {
    this.mostrarResumoSelecao();
  }

  public mostrarSelecionarQuartos() {
    this.mostraSelecionarQuartos = true;
    $('.selecionarQuartos').css({ 'margin-left': '100vw' });
    $('.selecionarQuartos').animate({ 'margin-left': '0' }, 200, function () {
      $('.selecionarQuartos .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public mostrarResumoSelecao() {
    this.mostraResumoSelecao = true;
    $('.resumoSelecao').css({ 'margin-left': '100vw' });
    $('.resumoSelecao').animate({ 'margin-left': '0' }, 200, function () {
      $('.resumoSelecao .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });
  }

  public onFecharResumoSelecao() {
    var me = this;
    $('.resumoSelecao .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.resumoSelecao').animate({ 'margin-left': '100vw' }, 200, function () {
      me.mostraResumoSelecao = false;
    });
  }

  public voltarTela() {
    this.onFechar.emit(null);
  }
}

