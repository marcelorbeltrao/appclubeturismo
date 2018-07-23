import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-inferior',
  templateUrl: './menuInferior.component.html',
  styleUrls: ['./menuInferior.component.css']
})


export class MenuInferiorComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location) { }

  menuSelecionado = '';
  
  ngOnInit() {
    this.menuSelecionado = window.location.pathname;
  }

  public abrirDestaques (){
    this.menuSelecionado = "/destaques";
  }

  public abrirPacotes (){
    this.menuSelecionado = "/pacotes";
  }
  
  public abrirHoteis (){
    this.menuSelecionado = "/hoteis";
  }    

  public abrirPerfil (){
    this.menuSelecionado = "/perfil";
  }   

  public abrirServicos (){
    this.menuSelecionado = "/servicos";
  }   
}
