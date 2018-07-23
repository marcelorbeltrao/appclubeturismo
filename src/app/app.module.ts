import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuInferiorComponent } from '../components/menuInferior/menuInferior.component';
import { DestaqueComponent } from '../modulos/destaques/destaques.component';
import { HoteisComponent } from '../modulos/hoteis/hoteis.component';
import { PacotesComponent } from '../modulos/pacotes/pacotes.component';
import { PerfilComponent } from '../modulos/perfil/perfil.component';
import { ServicosComponent } from '../modulos/servicos/servicos.component';
import { DetalhesPacoteComponent } from '../components/detalhesPacote/detalhesPacote.component';
import { DetalhesHotelComponent } from '../components/detalhesHotel/detalhesHotel.component';
import { ProcuraLocalComponent } from '../components/procuraLocal/procuraLocal.component';
import { TelaFiltrosComponent } from '../components/telaFiltros/telaFiltros.component';
import { SelecioneCidadeComponent } from '../components/selecioneCidade/selecioneCidade.component';
import { SelecionePeriodoComponent } from '../components/selecionePeriodo/selecionePeriodo.component';
import { SelecioneTipoProdutoComponent } from '../components/selecioneTipoProduto/selecioneTipoProduto.component';

import { TelaMapaComponent } from '../components/telaMapa/telaMapa.component';
import { TelaSaidaComponent } from '../components/telaSaida/telaSaida.component';
import { SelecionaDataComponent } from '../components/selecionaData/selecionaData.component';
import { SelecionaPessoasComponent } from '../components/selecionaPessoas/selecionaPessoas.component';
import { CriarUsuarioComponent } from '../components/criarUsuario/criarUsuario.component';
import { ResumoSelecaoComponent } from '../components/resumoSelecao/resumoSelecao.component';
import { TelaTextoComponent } from '../components/telaTexto/telaTexto.component';
import { FiltroHotelComponent } from '../components/filtroHotel/filtroHotel.component';
import { FiltroServicosComponent } from '../components/filtroServicos/filtroServicos.component';

import { ItemPacoteComponent } from '../components/itemPacote/itemPacote.component';
import { FiltroPacoteComponent } from '../components/filtroPacote/filtroPacote.component';
import { ItemHotelPacoteComponent } from '../components/itemHotelPacote/itemHotelPacote.component';

import { ItemHotelComponent } from '../components/itemHotel/itemHotel.component';
import { DadosUsuarioComponent } from '../components/dadosUsuario/dadosUsuario.component';
import { ProcuraLocalModel } from '../components/procuraLocal/procuraLocal.model';
import { SelecioneCidadeModel } from '../components/selecioneCidade/selecioneCidade.model';
import { SelecionePeriodoModel } from '../components/selecionePeriodo/selecionePeriodo.model';
import { SelecionarQuartosComponent } from '../components/selecionarQuartos/selecionarQuartos.component';
import { ListaHoteisPacotesComponent } from '../components/listaHoteisPacotes/listaHoteisPacotes.component';
import { SelecionarQuartosPacoteComponent } from '../components/selecionarQuartosPacote/selecionarQuartosPacote.component';
import { SelecioneDiaComponent } from '../components/selecioneDia/selecioneDia.component';

import { DetalhesPacoteModel } from '../components/detalhesPacote/detalhesPacote.model';

import { HoteisModel } from '../modulos/hoteis/hoteis.model';
import { ServicosModel } from '../modulos/servicos/servicos.model';
import { PacotesModel } from '../modulos/pacotes/pacotes.model';

import { IdadeCriancaPipe } from '../pipes/pipe';
import { mesExtensoPipe } from '../pipes/pipe';

import { diaMesSelecionadoPipe } from '../pipes/pipe';
import { APIConnect } from '../services/APIConnect';
import { diaSemanaSelecionadoPipe } from '../pipes/pipe';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './/app-routing.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AgmCoreModule } from '@agm/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import { PinchZoomComponent } from '../components/zoomFoto/pinch-zoom.component';
import {SwiperModule} from '../components/swiper/swiper.module'
@NgModule({
  declarations: [
            AppComponent,
            MenuInferiorComponent, 
            TelaMapaComponent,
            TelaTextoComponent,
            SelecionarQuartosComponent,
            ItemHotelComponent,
            PinchZoomComponent,
            ServicosComponent,
            FiltroServicosComponent,
            SelecioneDiaComponent,
            ResumoSelecaoComponent,
            SelecionePeriodoComponent,
            SelecioneTipoProdutoComponent,
            SelecionarQuartosPacoteComponent,
            DadosUsuarioComponent,
            ItemHotelPacoteComponent,
            FiltroPacoteComponent,
            ListaHoteisPacotesComponent,
            DetalhesHotelComponent,
            SelecioneCidadeComponent,
            TelaSaidaComponent, 
            TelaFiltrosComponent, 
            ItemPacoteComponent,
            CriarUsuarioComponent,
            IdadeCriancaPipe, 
            mesExtensoPipe,
            diaSemanaSelecionadoPipe, 
            diaMesSelecionadoPipe, 
            FiltroHotelComponent, 
            DetalhesPacoteComponent, 
            SelecionaPessoasComponent, 
            SelecionaDataComponent, 
            DestaqueComponent,
            HoteisComponent, 
            ProcuraLocalComponent, 
            PacotesComponent,
            PerfilComponent
  ],imports: [
             AgmCoreModule.forRoot({apiKey: "AIzaSyDE2zfjFQAyso_eXyZyN6NxG-igBx-vdZk",
             libraries: ["places"]}),
             ReactiveFormsModule, 
             BrowserModule, 
             HttpModule,
             SwiperModule,
             FlexLayoutModule,
             AppRoutingModule, 
             FormsModule, 
             MyDateRangePickerModule  
  ],
  providers: [APIConnect, SelecionePeriodoModel, DetalhesPacoteModel,  ProcuraLocalModel, SelecioneCidadeModel, PacotesModel, HoteisModel],
  bootstrap: [AppComponent, MenuInferiorComponent]
})

export class AppModule { 

}



