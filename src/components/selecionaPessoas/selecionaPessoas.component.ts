import { Component, Output, OnInit,EventEmitter,NgModule} from '@angular/core';
import { Location } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IdadeCriancaPipe} from '../../pipes/pipe';

@Component({
  selector: 'seleciona-pessoas',
  templateUrl: './selecionaPessoas.component.html',
  styleUrls: ['./selecionaPessoas.component.css']
})

export class SelecionaPessoasComponent implements OnInit {
  
  @Output() qtdPessoasChange: EventEmitter<any> = new EventEmitter();

  qtdQuartos = 1;
  qtdAdultos = 1;
  qtdCriancas = 0;

  listaCriancas = [];

  ngOnInit() {
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

  public aplicarQtd(evt){
    this.qtdPessoasChange.emit({event:evt,dados:{qtdQuartos:this.qtdQuartos, qtdCriancas:this.qtdCriancas, qtdAdultos:this.qtdAdultos, listaCriancas:this.listaCriancas}});
  }

  public inicializaValores(obj){
    this.qtdQuartos = obj.qtdQuartos;
    this.qtdAdultos = obj.qtdAdultos;
    this.qtdCriancas = obj.qtdCriancas;
  
    this.listaCriancas = obj.listaCriancas;
  }
}
