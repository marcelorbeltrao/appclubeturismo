import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CriarUsuarioComponent } from '../../components/criarUsuario/criarUsuario.component';
import { DadosUsuarioComponent } from '../../components/dadosUsuario/dadosUsuario.component';
import * as $ from "jquery";

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @ViewChild("telaCriarUsuario")
  private telaCriarUsuario: CriarUsuarioComponent;

  @ViewChild("telaDadosUsuario")
  private telaDadosUsuario: DadosUsuarioComponent;

  
  mostraDadosUsuario = false;
  mostraCriarUsuario = false;
  mostraCarregando = false;

  ngOnInit() {
    
  }

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
    this.mostrarDadosUsuario();
  }

  public criarConta(){
    this.mostraCriarUsuario = true;
    var me = this;

    $('.telaCriarUsuario').css({'margin-left':'100vw'});

    $('.telaCriarUsuario').animate({'margin-left':'0'},200, function(){
        $('.telaCriarUsuario .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });  
  }

  public onFecharCriarConta() {
    var me = this;
    $('.telaCriarUsuario .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaCriarUsuario').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraCriarUsuario = false;
    });    
  }

  public mostrarLogin(){
    var me = this;
    $('.telaDadosUsuario .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaDadosUsuario').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraDadosUsuario = false;
    }); 
  }

  public entrarLogin(){
    this.mostrarCarregando();
  }

  public facebookLogin(){
    this.mostrarCarregando();
  }

  public mostrarDadosUsuario(){
    this.mostraDadosUsuario = true;

    var me = this;

    $('.telaDadosUsuario').css({'margin-left':'100vw'});

    $('.telaDadosUsuario').animate({'margin-left':'0'},200, function(){
        $('.telaDadosUsuario .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });   
  }
}
