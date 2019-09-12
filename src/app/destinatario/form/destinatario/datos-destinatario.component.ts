import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { ProfesionService, OficioService, MensajesService } from '../../../core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css']
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;
    @Input("setProfesion") public setProfesionid;
    @Input("setOficio") public setOficioid;

    public listaProfesiones:object;
    public listaOficios:object;

    constructor(
        private _profesionService: ProfesionService,
        private _oficioService: OficioService,
        private _mensajeService: MensajesService,
        private _utilService: UtilService
    ){
    }

    ngOnInit() {
         this.profesiones();
         this.oficios();
    }

    get destinatarioForm() { return this.destinatario.controls; }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._utilService.formatObjetoAFecha(obj));
    }

    esNumero(obj: any) {
        if (!this._utilService.validarNumero(obj.value)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
    }

    profesiones() {
        this._profesionService.listarProfesiones().subscribe(
            data =>{
               return this.listaProfesiones = data;
            },
            error => {
              this._mensajeService.cancelado(error, [{name:''}]);
            }
        );
    }

    oficios() {
        this._oficioService.listarOficios().subscribe(
            data => {
                return this.listaOficios = data;
            },
            error => {
              this._mensajeService.cancelado(error, [{name:''}]);
            }
        );
    }

    getProfesion(profesion){
        this.destinatario.controls.profesionid.setValue(profesion.id);
    }

    getNombreListadoPorId(id, listado){
        let seleccion = "";
        for (var key in listado) {
            if(listado[key].id == id ){
                seleccion = listado[key].nombre;
            }
        }
        return seleccion;
    }

    getOficio(oficio){
        this.destinatario.controls.oficioid.setValue(oficio.id);
    }
}
