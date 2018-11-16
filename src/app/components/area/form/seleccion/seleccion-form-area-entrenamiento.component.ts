import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../../breadcrumbs/breadcrumbs.service";
// services
import { OfertaService } from '../../../../services/oferta.service'
import { DestinatarioService } from '../../../../services/destinatario.service'
import { MensajesService } from '../../../../services/mensajes.service'


@Component({
    selector: 'area-entrenamiento-form-seleccion',
    templateUrl: './seleccion-form-area-entrenamiento.html',
    styleUrls: ['./seleccion-form-area-entrenamiento.css']
})
export class SeleccionFormAreaEntrenamientoComponent implements OnInit {
    page = 1;
    public ofertas:any[];
    public destinatarios: any[];

    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _ofertaService: OfertaService,
        private _destinatarioService: DestinatarioService,
        private _mensajesService: MensajesService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] },{ label: 'Área de entrenamiento', url: 'area', params: [] },{ label: 'Crear', url: 'area/crear/seleccion', params: [] }]);
      this.listarOfertas();
      this.listarDestinatario();
    }

    private listarOfertas(){
      this._ofertaService.listarOfertas('').subscribe(
        datos => {
          this.ofertas = datos['coleccion'];
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
      }

      private listarDestinatario(){
        this._destinatarioService.listarDestinatario().subscribe(
          datos => {
            this.destinatarios = datos['coleccion'];
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }



    cancelar() {
        this._router.navigate(['area']);
    }

    crearArea(){
        this._router.navigate(['area', 'crear-plan']);
    }

    destinatarioElegido(destinatario){
      if (destinatario != null) {
        this._ofertaService.buscarOfertaPor(destinatario).subscribe(
          datos => {
            this.ofertas = datos['coleccion'];
          }, error => {
            this._mensajesService.cancelado(error, [{name:''}]);
          });
      } else {
        this.listarOfertas();
      }
    }
}
