import { Component, ElementRef, ViewChild, Output, Input, OnInit, EventEmitter, NgModule, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { } from '@types/googlemaps'

import * as $ from "jquery";

@Component({
  selector: 'tela-mapa',
  templateUrl: './telaMapa.component.html',
  styleUrls: ['./telaMapa.component.css']
})

export class TelaMapaComponent implements OnInit {

  @Output() onFechar: EventEmitter<any> = new EventEmitter();

  @ViewChild('gmapElement') gmapElement: any;
  map: google.maps.Map;
  markers:any = [];

  lat: number = 15.8429235;
  lng: number = -48.0328425;

  pontoLocalSelecionado = {lat:this.lat, lng:this.lng};
  textoLocalSelecionado = '';

  constructor() { }

  ngOnInit() {
    var ponto = { lat: this.lat, lng: this.lng };
    var me = this;
    setTimeout(function () {
      /*
      var mapProp = {
        center: new google.maps.LatLng(me.lat, me.lng),
        zoom: 15
      };
      me.map = new google.maps.Map(me.gmapElement._elem.nativeElement, mapProp);
*/
      me.gmapElement.triggerResize();
    }, 1000);
  }

  public adicionaPonto() {
    this.markers = [
      {
        lat: 51.673858,
        lng: 7.815982,
        label: 'A',
        draggable: true
      },
      {
        lat: 51.373858,
        lng: 7.215982,
        label: 'B',
        draggable: false
      },
      {
        lat: 51.723858,
        lng: 7.895982,
        label: 'C',
        draggable: true
      }
    ]
  }

  public inicializaVariaveis(obj, pontoLocalSelecionado, lista) {
    this.textoLocalSelecionado = obj;
    this.pontoLocalSelecionado = pontoLocalSelecionado;

    for(var t = 0; t < lista.length; t++){
      this.markers.push({lat: lista[t].lat,lng:  lista[t].lng,label: String(lista[t].valor),draggable: true})
    }
  }

  public voltarTela() {

    this.onFechar.emit(null);
  }
}
