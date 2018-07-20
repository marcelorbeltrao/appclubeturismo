import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestaqueComponent } from '../modulos/destaques/destaques.component';
import { HoteisComponent } from '../modulos/hoteis/hoteis.component';
import { PacotesComponent } from '../modulos/pacotes/pacotes.component';
import { PerfilComponent } from '../modulos/perfil/perfil.component';

const routes: Routes = [
  { path: 'destaques', component: DestaqueComponent },
  { path: 'hoteis', component: HoteisComponent },
  { path: 'pacotes', component: PacotesComponent },
  { path: 'perfil', component: PerfilComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
