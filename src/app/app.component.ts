import { Component, OnInit } from '@angular/core';
import { APIConnect } from '../services/APIConnect';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'app';
  apiConectado;
  mostraCarregando = false;

  constructor(public apiConnect: APIConnect){

  }
  ngOnInit() {
    var me  = this;
    this.mostrarCarregando();
    this.apiConnect.connectAPI().then(function (result){
        me.apiConectado = result;
        me.fecharCarregando();
    });
    
  }

  
  public mostrarCarregando(){
    this.mostraCarregando = true;
    
    $('.icoCarregando').css({'padding-top':'80px'});
    $('.icoCarregando').animate({'padding-top':'0px'});
  }

  public fecharCarregando(){
    this.mostraCarregando = false;
  }
}
