import { Component, Output, Input, OnInit, EventEmitter, NgModule, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'item-pacote',
  templateUrl: './itemPacote.component.html',
  styleUrls: ['./itemPacote.component.css']
})

export class ItemPacoteComponent implements OnInit {

  @HostBinding('class.dados') @Input() dados;

  item: any = {};

  possuiHotel = false;
  possuiAviao = false;
  possuiTraslado = false;
  possuiPasseio = false;

  constructor() {
  }

  ngOnInit() {
    this.item = this.dados;

    this.item.qtdDiarias = this.item.nights;
    this.item.qtdPessoas = this.item.qtdPessoas;

    for (var t = 0; t < this.item.includedServices.length; t++) {
      var itm = this.item.includedServices[t];

      switch (itm) {
        case 'Hotel':
          this.item.possuiHotel = true;
          break;
        case 'Transfer':
          this.item.possuiTraslado = true;
          break;
        case 'Ride':
          this.item.possuiPasseio = true;
          break;
        case 'Flight':
          this.item.possuiAviao = true;
          break;
      }
    }
  }
}
