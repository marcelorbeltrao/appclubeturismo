import { Component, Output, ViewChild, OnInit,EventEmitter,NgModule} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SelecioneCidadeComponent } from '../../components/selecioneCidade/selecioneCidade.component';
import { SelecionePeriodoComponent } from '../../components/selecionePeriodo/selecionePeriodo.component';
import * as $ from "jquery";

@Component({
  selector: 'filtro-pacote',
  templateUrl: './filtroPacote.component.html',
  styleUrls: ['./filtroPacote.component.css']
})

export class FiltroPacoteComponent implements OnInit {

  @Output() onFiltro: EventEmitter<any> = new EventEmitter();
  @ViewChild("procuraLocalFiltroDestino") procuraLocalFiltroDestino: SelecioneCidadeComponent;
  @ViewChild("procuraLocalFiltroOrigem") procuraLocalFiltroOrigem: SelecioneCidadeComponent;
  @ViewChild("selecionePeriodo") selecionePeriodo: SelecionePeriodoComponent;
  @ViewChild("selecioneTipoProduto") selecioneTipoProduto: SelecionePeriodoComponent;
  
  valOpViagem = 1;

  qtdQuartos = 1;
  qtdAdultos = 2;
  qtdCriancas = 0;

  mesSelecionado = 0;
  anoSelecionado = 0;
  
  listaCriancas = [];
  
  mostraProcuraLocalOrigem = false;
  mostraProcuraLocalDestino = false;
  mostraSelecionePeriodo = false;
  mostraSelecionarTipoProduto = false;
  
  dataInicio = null;
  dataFim = null;

  bloqueiaDestino = true;
  bloqueiaPeriodo = true;
  bloqueiaTipoProduto = true;

  cidadeOrigemSelecionada = false;
  cidadeDestinoSelecionada = false;
  textoLocalOrigemSelecionado = 'Selecione a cidade de origem';
  textoLocalDestinoSelecionado = 'Selecione a cidade de destino';
  idLocalOrigemSelecionado = null;
  idLocalDestinoSelecionado = null;
  valPeriodoSelecionado = 'Selecione um período';
  valTipoProdutoSelecionado = 'Selecione um tipo de produto';
  pontoLocalSelecionado = null;
  listaPeriodo = []
  
  ngOnInit() {
  }

  public onFecharProcuraLocalOrigem(){
    var me = this;
    $('.procuraLocalFiltroOrigem .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocalFiltroOrigem').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraProcuraLocalOrigem = false;
    });    
  }

  public clickOp(ind){
    this.valOpViagem = ind;
    this.reinicializaCampos();
  }

  public onFecharProcuraLocalDestino(){
    var me = this;
    $('.procuraLocalFiltroDestino .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.procuraLocalFiltroDestino').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraProcuraLocalDestino = false;
    });    
  }

  public selecionarLocalOrigem(){
    this.mostraProcuraLocalOrigem = true;
    var me = this;

    $('.procuraLocalFiltroOrigem').css({'margin-left':'100vw'});
    $('.procuraLocalFiltroOrigem').animate({'margin-left':'0'},200, function(){
        $('.procuraLocalFiltroOrigem .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
        me.procuraLocalFiltroOrigem.inicializa(0, null, null);
    });    
  }

  public selecionarLocalDestino(){
    this.mostraProcuraLocalDestino = true;
    var me = this;
    $('.procuraLocalFiltroDestino').css({'margin-left':'100vw'});
    $('.procuraLocalFiltroDestino').animate({'margin-left':'0'},200, function(){
        $('.procuraLocalFiltroDestino .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
        me.procuraLocalFiltroDestino.inicializa(1, me.idLocalOrigemSelecionado, me.valOpViagem);
    });  
  }

  public selecionarPeriodo(){
    this.mostraSelecionePeriodo = true;
    var obj = {localOrigem:this.idLocalOrigemSelecionado, localDestino:this.idLocalDestinoSelecionado, qtdQuartos:this.qtdQuartos, qtdAdultos:this.qtdAdultos, qtdCriancas:this.qtdCriancas, listaCriancas:this.listaCriancas};

    this.selecionePeriodo.inicializa(obj);

    $('.selecionePeriodo').css({'margin-left':'100vw'});
    $('.selecionePeriodo').animate({'margin-left':'0'},200, function(){
        $('.selecionePeriodo .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }  

  public onFecharSelecionePeriodo(){
    var me = this;
    $('.selecionePeriodo .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecionePeriodo').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraSelecionePeriodo = false;
    });    
  }

  public onFecharSelecioneTipoProduto(){
    var me = this;
    $('.selecioneTipoPr oduto .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecioneTipoProduto').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraSelecionarTipoProduto = false;
    });    
  }

  public selecionarTipoProduto(){
    this.mostraSelecionarTipoProduto = true;
    
    var obj = {localOrigem:this.idLocalOrigemSelecionado, localDestino:this.idLocalDestinoSelecionado, qtdQuartos:this.qtdQuartos, qtdAdultos:this.qtdAdultos, qtdCriancas:this.qtdCriancas, listaCriancas:this.listaCriancas, mes:this.mesSelecionado, ano:this.anoSelecionado};

    this.selecioneTipoProduto.inicializa(obj);

    $('.selecioneTipoProduto').css({'margin-left':'100vw'});
    $('.selecioneTipoProduto').animate({'margin-left':'0'},200, function(){
        $('.selecioneTipoProduto .botaoVoltar').animate({ 'opacity': 1, 'margin-left': 0 });
    });    
  }  

  public onSelecionarTipoProduto(){
    var me = this;
    $('.selecioneTipoProduto .botaoVoltar').css({ 'opacity': 0, 'margin-left': 10 });
    $('.selecioneTipoProduto').animate({'margin-left':'100vw'}, 200 , function (){
      me.mostraSelecionarTipoProduto = false;
    });    
  }

  public localOrigemSelecionado(evt){
    this.textoLocalOrigemSelecionado = evt.dados.pais;
    this.idLocalOrigemSelecionado = evt.dados.id;

    this.reinicializaCampos();
    this.bloqueiaDestino = false;
  }

  public reinicializaCampos(){
    this.cidadeOrigemSelecionada = true;
    this.cidadeDestinoSelecionada = false;
    this.valPeriodoSelecionado = 'Selecione um período';
    this.textoLocalDestinoSelecionado = 'Selecione a cidade de destino';
    this.valTipoProdutoSelecionado = 'Selecione um tipo de produto';
    this.mesSelecionado = 0;
    this.anoSelecionado = 0;

    if(this.idLocalOrigemSelecionado)
      this.bloqueiaDestino = false;
    else
      this.bloqueiaDestino = true;
    
    this.bloqueiaPeriodo = true;
    this.bloqueiaTipoProduto = true;
  }

  public localDestinoSelecionado(evt){
    this.textoLocalDestinoSelecionado = evt.dados.pais;
    this.idLocalDestinoSelecionado = evt.dados.id;
    this.valPeriodoSelecionado = 'Selecione um período';
    this.valTipoProdutoSelecionado = 'Selecione um tipo de produto';
    this.mesSelecionado = 0;
    this.anoSelecionado = 0;
    
    this.cidadeDestinoSelecionada = true;
    this.bloqueiaPeriodo = false;
    this.bloqueiaTipoProduto = false;
    this.bloqueiaTipoProduto = true;
  }

  public adicionaZero(val){
    if(String(val).length == 1)
      return '0' + String(val);
    else
      return val;
  }

  public periodoSelecionado(evt){
      this.listaPeriodo = evt.dados.listaResultado;

      this.mesSelecionado = evt.dados.item.month;
      this.anoSelecionado = evt.dados.item.year;
      this.valTipoProdutoSelecionado = 'Selecione um tipo de produto';
      this.valPeriodoSelecionado = this.mesSelecionado + ' de ' + this.anoSelecionado;
      this.bloqueiaTipoProduto = false;
  }

  public aumentaQtdQuarto (){
    if(this.qtdQuartos == 4)
      return;

    this.qtdQuartos++;
  }

  public diminuiQtdQuarto (){
    if(this.qtdQuartos > 1)
      this.qtdQuartos--;
  }

  public aumentaQtdAdultos (){
    if(this.qtdAdultos == 4)
      return;

    this.qtdAdultos++;
  }

  public diminuiQtdAdultos (){
    if(this.qtdAdultos > 1)
      this.qtdAdultos--;
  }
  
  public aumentaQtdCriancas (){
    if(this.qtdCriancas > 2)
      return;

    this.qtdCriancas++;

    this.listaCriancas.push({label:'Idade Criança ' + (this.listaCriancas.length + 1), idadeCrianca:0});
  }

  public diminuiQtdCriancas (){
    if(this.qtdCriancas > 0){
      this.qtdCriancas--;

      this.listaCriancas.pop();
    }
  }

  public aumentaIdadeCrianca (item){
    if(item.idadeCrianca > 11)
      return;

    item.idadeCrianca++;
  }

  public diminuiIdadeCrianca (item){
    if(item.idadeCrianca > 0)
      item.idadeCrianca--;
  }  

  public onFiltroClick(){
    var obj = {localOrigem:this.idLocalOrigemSelecionado, localDestino:this.idLocalDestinoSelecionado, textoLocalDestino:this.textoLocalDestinoSelecionado, qtdQuartos:this.qtdQuartos, qtdAdultos:this.qtdAdultos, qtdCriancas:this.qtdCriancas, listaCriancas:this.listaCriancas, mes:this.mesSelecionado, ano:this.anoSelecionado};

    this.onFiltro.emit({event:null, dados: obj});
  }

}
