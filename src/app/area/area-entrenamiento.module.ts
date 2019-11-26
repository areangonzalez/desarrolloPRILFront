// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AreaEntrenamientoRoutingModule } from "./area-entrenamiento-routing.module";

//Importo los componentes
import { AreaEntrenamientoComponent } from './area-entrenamiento.component';
import { SeleccionFormAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent } from "./form";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";
import {
  DetalleDestinatarioContentComponent, DetalleDestinatarioModalComponent
} from "./modal";



// Metadatos del módulo
@NgModule({
    declarations: [AreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent, DetalleDestinatarioContentComponent, DetalleDestinatarioModalComponent],
    imports: [CommonModule, NgbModule, SharedModule,  AreaEntrenamientoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent, DetalleDestinatarioContentComponent, DetalleDestinatarioModalComponent],
    entryComponents: [DetalleDestinatarioContentComponent, DetalleDestinatarioModalComponent]
})
export class AreaEntrenamientoModule { }
