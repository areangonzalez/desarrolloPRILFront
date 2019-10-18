import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { CabeceraComponent, PieComponent } from "./layout";
import { ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent } from "./lista";
import { LugarComponent } from "./formulario/lugar";
import { DatosPersonaComponent } from "./formulario/persona";
import { DatosDestinatarioComponent, BusquedaDestinatarioComponent } from "./formulario/destinatario";
import { EstudioComponent } from "./formulario/estudio";
import { AutoCompletarComponent } from "./formulario/auto-completar";
import { DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent } from "./formulario/ambiente-trabajo";

import { DatosDestinatarioVistaComponent } from "./vista";
import { TagComponent, VistaTagComponent } from "./formulario/tag";

import {
  ModalConfirmacionComponent, ModalContentConfirmacion,
  ModalEstudioComponent, ModalContentEstudio
} from './modal'

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CabeceraComponent, PieComponent,
    ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent,
    LugarComponent,
    DatosPersonaComponent,
    DatosDestinatarioComponent, BusquedaDestinatarioComponent,
    EstudioComponent,
    AutoCompletarComponent,
    DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent,
    DatosDestinatarioVistaComponent,
    TagComponent, VistaTagComponent,
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    CabeceraComponent, PieComponent,
    ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent,
    LugarComponent,
    DatosPersonaComponent,
    DatosDestinatarioComponent, BusquedaDestinatarioComponent,
    EstudioComponent,
    AutoCompletarComponent,
    DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent,
    DatosDestinatarioVistaComponent,
    TagComponent, VistaTagComponent,
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio
  ],
  entryComponents:[
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio
  ]
})
export class SharedModule {}
