import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurarPagina } from '../../core/models';

@Component({
    selector: 'area-entrenamiento-lista-destinatario',
    templateUrl: './lista-destinatario-area-entrenamiento.html',
    styleUrls: ['./lista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioAreaEntrenamientoComponent {
    @Input('destinatarios') destinatarios: any;
    @Input('configurarPaginacion') public configurarPaginacion: ConfigurarPagina;
    @Input("idSeleccionado") public selId: number;
    @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
    @Output('destinatarioElegido') destinatarioElegido = new EventEmitter();

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
    }

    limpiar(){
        console.log('limpiar campos');
    }


    getDireccion(lugar: Object) {
      let dir = "";
      dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
      dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
      dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
      dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

      return dir;
    }

    seleccionarDestinatario(id:number, formacionDeseada:string, lista_oficio:any){
      if (this.selId != id) {
        this.selId = id;
        this.destinatarioElegido.emit({ id:id, deseo_actividad: formacionDeseada, lista_oficio: lista_oficio });
      }else{
        this.selId = 0;
        this.destinatarioElegido.emit(null);
      }

    }
    /**
     * Envia la página seleccionada al componente padre
     * @param page numero de página
     */
    cambioPagina(page:number){
      this.cambioDePagina.emit(page);
    }

}
