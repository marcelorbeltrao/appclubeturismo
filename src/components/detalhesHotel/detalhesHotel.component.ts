import { Component, ViewChild, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ResumoSelecaoComponent } from '../../components/resumoSelecao/resumoSelecao.component';
import { SelecionarQuartosComponent } from '../../components/selecionarQuartos/selecionarQuartos.component';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import {ImageZoomModule} from 'angular2-image-zoom';
import { AgmCoreModule } from '@agm/core';

import * as $ from "jquery";
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'detalhes-hotel',
  templateUrl: './detalhesHotel.component.html',
  styleUrls: ['./detalhesHotel.component.css']
})

export class DetalhesHotelComponent implements OnInit {
  
  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  
  @ViewChild("resumoSelecao") resumoSelecao: ResumoSelecaoComponent;
  @ViewChild("selecionarQuartos") selecionarQuartos: SelecionarQuartosComponent;
  @ViewChild("swiper") swiper: SwiperComponent;
  
  @ViewChild('gmapElement') gmapElement: any;
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  map: google.maps.Map;
  markers:any = [];
  hotel:any = {};
  exp:boolean = true;
  textBotao:string = 'Mostrar mais';
  imagens:any = [];
  lat: number = 15.8429235;
  lng: number = -48.0328425;
  
  apiGallery:any = null;

  mostraSelecionarQuartos= false;
  mostraResumoSelecao = false;
  listaRegulamentos = [];
  conf:GALLERY_CONF = {};
  quartos:any = [];
  constructor() {   }
 
  ngOnInit() {
    
    this.listaRegulamentos.push({id:1, label:'Conheça o pacote', conteudo:''});
    this.listaRegulamentos.push({id:2, label:'Dados do voo', conteudo:''});
    this.listaRegulamentos.push({id:3, label:'Tipo de acomodação', conteudo:''});
    this.listaRegulamentos.push({id:4, label:'Regras para crianças', conteudo:''});
    this.listaRegulamentos.push({id:5, label:'Período válido para viajar', conteudo:''});
    this.listaRegulamentos.push({id:6, label:'Documentos para viajar', conteudo:''});
    this.listaRegulamentos.push({id:7, label:'Horário de entrada e saída do hotel', conteudo:''});

  }


  public inicializaHotel(hot){
    $('.camposDetalhes').scrollTop(0);

    this.hotel = hot;
    this.hotel.endereco = hot.address['street'];
    this.hotel.cidade = hot.address['city'].name;
    this.hotel.zipCode = hot.address['zipCode'];
    this.quartos = this.hotel['accommodations'].items;

    this.swiper.setIndex(0);
    this.imagens = [];

    for(var t = 0 ; t < this.hotel.images.items.length; t++){
      var img = this.hotel.images.items[t].link;
      var tituloFoto = this.hotel.images.items[0].title;
      this.imagens.push(
        {
          path: img
        })
    }
    var me = this;
  }

  public abrirFullScreen(){

  }

  public mostrarMaisClick(){
    this.exp = !this.exp;

    if(!this.exp){
      $('.descricaoHotel').css({'height':'auto'});
      this.textBotao = 'Mostrar menos';
    }
    else{
      $('.descricaoHotel').css({'height':'66px'});
      this.textBotao = 'Mostrar mais';
    }
      
  }

  public onSelecionarQuartos(){
    this.selecionarQuartos.setQuartos(this.quartos, this.hotel);
    this.mostrarSelecionarQuartos();
  }

  public onSelecionarPacote(){
    this.mostrarResumoSelecao();
  }

  public mostrarSelecionarQuartos(){
    this.mostraSelecionarQuartos = true;
    $('.selecionarQuartos').css({'margin-left':'100vw'});
    $('.selecionarQuartos').animate({'margin-left':'0'},200, function(){
        $('.selecionarQuartos .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
}

  public mostrarResumoSelecao(){
      this.mostraResumoSelecao = true;
      $('.resumoSelecao').css({'margin-left':'100vw'});
      $('.resumoSelecao').animate({'margin-left':'0'},200, function(){
          $('.resumoSelecao .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
      });    
  }

  public onFecharSelecionarQuartos() {
    var me = this;
    $('.selecionarQuartos .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionarQuartos').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraSelecionarQuartos = false;
    });    
  }

  public onFecharResumoSelecao() {
    var me = this;
    $('.resumoSelecao .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.resumoSelecao').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraResumoSelecao = false;
    });    
  }

  public voltarTela(){
    this.onFechar.emit(null);
  }
}

