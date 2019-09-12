// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DestinatarioRoutingModule } from './destinatario-routing.module'
//Importo los componentes
import { DestinatarioComponent } from './destinatario.component';
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { ListaDestinatarioComponent } from './lista/lista-destinatario.component';
import { VistaDestinatarioComponent } from './vista/vista-destinatario.component';
import { BusquedaDestinatarioComponent } from "./busqueda/busqueda-destinatario.component";
import { DatosPersonaComponent } from "./form/persona/datos-persona.component";
import { DatosDestinatarioComponent } from "./form/destinatario/datos-destinatario.component";
import { EstudioComponent } from "./form/estudio/estudio.component";
import { ListaEstudioComponent } from "./lista/lista-estudio/lista-estudio.component";
import { ModalContentEstudio, ModalEstudioComponent } from "./form/modal-estudio/modal-estudio.component";
import { ModalContentConfirmacion, ModalConfirmacionComponent } from "./form/modal-confirmacion/modal-confirmacion.component";
import { AutoCompletarComponent } from "./form/auto-completar/auto-completar.component";
import { LugarComponent } from "./form/lugar/lugar.component";

// Metadatos del módulo
@NgModule({
    declarations: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent, DatosPersonaComponent, DatosDestinatarioComponent, EstudioComponent, ListaEstudioComponent, ModalContentEstudio, ModalEstudioComponent, ModalContentConfirmacion, ModalConfirmacionComponent, AutoCompletarComponent, LugarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, DestinatarioRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent, DatosPersonaComponent, DatosDestinatarioComponent, EstudioComponent, ListaEstudioComponent, ModalContentEstudio, ModalEstudioComponent, ModalContentConfirmacion, ModalConfirmacionComponent, AutoCompletarComponent, LugarComponent, ReactiveFormsModule],
    entryComponents: [ModalContentEstudio, ModalContentConfirmacion]

})
export class DestinatarioModule { }