import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../shared/breadcrumbs/breadcrumbs.service";
import { AreaEntrenamientoService } from 'src/app/core/services/area-entrenamiento.service';
import { MensajesService } from 'src/app/core/services/mensajes.service';


@Component({
    selector: 'app-area-entrenamiento',
    templateUrl: './area-entrenamiento.html',
    // styleUrls: ['./lista.component.css']
})
export class AreaEntrenamientoComponent implements OnInit {
    public areas = [];
    public totalFiltrado = 0;
    public page = 1;

    constructor(private breadcrumbsService: BreadcrumbsService, private _areaEntrenamientoService: AreaEntrenamientoService, private _mensajesService: MensajesService) {
    }

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area-entrenamiento', params: [] }]);
      // Obtener listado de area de entrenamiento
          this.obtenerAreasEntrenamiento();
    }


    private obtenerAreasEntrenamiento(){
      this._areaEntrenamientoService.listar().subscribe(
        datos => {
          if (datos['success']) {
            this.areas = datos['coleccion'];
          }
          this.totalFiltrado = datos['total_filtrado'];
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }
}