import { Component, ViewChild, Output, Input, OnInit,EventEmitter,NgModule, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TelaTextoComponent } from '../../components/telaTexto/telaTexto.component';

import * as $ from "jquery";

@Component({
  selector: 'dados-usuario',
  templateUrl: './dadosUsuario.component.html',
  styleUrls: ['./dadosUsuario.component.css']
})

export class DadosUsuarioComponent implements OnInit {
  
  @Output() onFechar: EventEmitter<any> = new EventEmitter();
  
  @ViewChild("telaTexto") telaTexto: TelaTextoComponent;

  mostraTelaTexto = false;
  botaoLiClicado = false;

  constructor() {   }
 
  ngOnInit() {

  }

  public onFecharTelaTexto() {
    var me = this;
    $('.telaTexto .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaTexto').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraTelaTexto = false;
    });    
  }

  public onTermoUso(){
    this.mostraTelaTexto = true;
    $('.telaTexto').css({'margin-left':'100vw'});
    $('.telaTexto').animate({'margin-left':'0'},200, function(){
        $('.telaTexto .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });  
  }

  public onPolitica(){
    this.mostraTelaTexto = true;
    $('.telaTexto').css({'margin-left':'100vw'});
    $('.telaTexto').animate({'margin-left':'0'},200, function(){
        $('.telaTexto .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });  
  }

  public onSair(){
    this.onFechar.emit(null);
  }
}

