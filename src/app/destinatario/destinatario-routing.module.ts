import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinatarioComponent } from "./destinatario.component";
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { VistaDestinatarioComponent } from './vista';

import { SexoService, GeneroService, EstadoCivilService, OficioService, DestinatarioService } from "../core/services";
/* import { VistaDestinatarioComponent } from "../shared/vista/vista-destinatario.component";
import { EstudioComponent } from "../shared/formulario/estudio/estudio.component"; */

const routes: Routes = [
    {
      path: '', component: DestinatarioComponent,
      data: { loading: true, title: 'Lista destinatarios', breadcrumb: 'Lista' },
      resolve: { destinatarios: DestinatarioService }
    },
    {
      path: 'agregar', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Agregar destinatario', breadcrumb: 'Agregar' },
      resolve: { sexo: SexoService, genero: GeneroService, estadoCivil: EstadoCivilService, oficio: OficioService }
    },{
      path: 'vista/:id', component: VistaDestinatarioComponent,
      data: { loading: true, title: 'Ver destinatario', breadcrumb: 'Vista' }
    /*},{
      path: 'editar/:id', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Editar destinatario', breadcrumb: 'Editar' }
    },{
      path: 'destinatario/estudio', component: EstudioComponent,
      data: { loading: true, title: 'Estudio/s', breadcrumb: 'Estudio' } */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [SexoService, GeneroService, EstadoCivilService, OficioService, DestinatarioService]
})
export class DestinatarioRoutingModule { }
