import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DetalhesPacoteComponent } from '../../components/detalhesPacote/detalhesPacote.component';
import { ProcuraLocalComponent } from '../../components/procuraLocal/procuraLocal.component';
import { TelaFiltrosComponent } from '../../components/telaFiltros/telaFiltros.component';
import { TelaSaidaComponent } from '../../components/telaSaida/telaSaida.component';

import * as $ from "jquery";

@Component({
  selector: 'pacotes',
  templateUrl: './pacotes.component.html',
  styleUrls: ['./pacotes.component.css']
})
export class PacotesoldComponent implements OnInit {

  @ViewChild("telaSaidaComp")
  private telaSaidaComp: TelaSaidaComponent;

  @ViewChild("telaFiltroComp")
  private telaFiltroComp: TelaFiltrosComponent;

  textoPesquisa = 'Pesquise um destino ou pacote';

  items = [];
  itemsFiltrado = [];
  itemsOriginal = [];
  
  mostraDetalhesPacote = false;
  mostraProcuraLocal = false;
  mostraTelaFiltro = false;
  mostraTelaSaida = false;
  mostraFiltro = true;
  filtroSaidaAplicado = false;
  filtroFiltroAplicado = false;
  pacoteSelecionado = {};
  scrollAnt = 0;
  
  objPacotes = {};
  listaCidades = [];

  mostraCarregando = false;

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
    for(var g = 0 ; g < this.items.length; g ++){
      this.itemsOriginal.push(this.items[g]);

      if(!this.objPacotes[this.items[g].local]){
          this.objPacotes[this.items[g].local] = {};
          this.objPacotes[this.items[g].local].pacotes = [];
          this.objPacotes[this.items[g].local].pacotes.push(this.items[g]);

          this.listaCidades.push({id:this.listaCidades.length + 1, cidade:this.items[g].local, pacotes:this.objPacotes[this.items[g].local].pacotes, selecionado:true});
      }
      else{
          this.objPacotes[this.items[g].local].pacotes.push(this.items[g]);
      };
    }

    this.itemsFiltrado = this.itemsOriginal;
  }

  public localSelecionado(evt){
    this.textoPesquisa = evt.dados.formatted_address;

    this.filtroSaidaAplicado = false;
    this.filtroFiltroAplicado = false;
    this.telaSaidaComp.limparSelecao();
    this.telaFiltroComp.limparSelecao();

    this.items = this.itemsOriginal;
    this.itemsFiltrado = this.itemsOriginal;
    this.mostrarCarregando();
  }

  public mostrarCarregando(){
    this.mostraCarregando = true;
    
    $('.icoCarregando').css({'padding-top':'80px'});
    $('.icoCarregando').animate({'padding-top':'0px'});

    var me = this;
    setTimeout(function (){
        me.fecharCarregando();
    },1000)
  }

  public fecharCarregando(){
    this.mostraCarregando = false;
  }

  public onFiltroAplicado(event){
    this.filtroSaidaAplicado = event.filtroAplicado;
    this.itemsFiltrado = event.pacotes;
    this.items = event.pacotes;
    this.filtroFiltroAplicado = false;
    this.telaFiltroComp.limparSelecao();
    this.mostrarCarregando();
  }

  public onFiltroFiltroAplicado(event){
      this.filtroFiltroAplicado = event.filtroAplicado;
      this.items = event.pacotes;

      this.mostrarCarregando();
  }

  public mostarFiltroClick(){
    this.mostraTelaFiltro = true;

    this.telaFiltroComp.setPacotes(this.itemsFiltrado);

    $('.telaFiltro').css({'margin-left':'100vw'});
    $('.telaFiltro').animate({'margin-left':'0'},200, function(){
        $('.botaoVoltarTela').animate({ 'opacity': 1, 'margin-left': 0 });
    });     
  }
  
  public onScroll(event){
    if(event.currentTarget.scrollTop < this.scrollAnt)
      $('.caixaFiltro').css({'display':'flex'});
    else
      $('.caixaFiltro').css({'display':'none'});

    this.scrollAnt = event.currentTarget.scrollTop;
  }

  public selecionarLocal(){
    this.mostraProcuraLocal = true;

    $('.procuraLocal').css({'margin-left':'100vw'});
    $('.procuraLocal').animate({'margin-left':'0'},200, function(){
        $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }



  public mostarSaidaClick(){
    this.mostraTelaSaida = true;
    var me = this;

    $('.telaSaida').css({'margin-left':'100vw'});

    $('.telaSaida').animate({'margin-left':'0'},200, function(){
        $('.botaoVoltarTela').animate({ 'opacity': 1, 'margin-left': 0 });

        me.telaSaidaComp.setCidades({objPacotes:me.objPacotes, listaCidades:me.listaCidades});
    });     
  }
  

  public itemSelecionado(item) {
    this.mostraDetalhesPacote = true;
    
    this.pacoteSelecionado = item;

    $('.detalhes').css({'margin-left':'100vw'});
    $('.detalhes').animate({'margin-left':'0'},200, function(){
      $('.botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }
   
  public onFecharSaida() {
    var me = this;
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaSaida').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraTelaSaida = false;
    });    
  }

  public onFecharFiltro() {
    var me = this;
    $('.botaoVoltarTela').css({ 'opacity': 0, 'margin-left': 10 });
    $('.telaFiltro').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraTelaFiltro = false;
    });    
  }

  public onFecharDetalhes() {
    var me = this;
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.detalhes').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraProcuraLocal = false;
    });    
  }

  public onFecharProcuraLocal(){
    var me = this;
    
    $('.botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocal').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraDetalhesPacote = false;
    });    
  }
}
