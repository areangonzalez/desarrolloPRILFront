import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";
// services
import { SexoService } from "../../../../services/sexo.service";
import { GeneroService } from "../../../../services/genero.service";
import { EstadoCivilService } from "../../../../services/estado-civil.service";

@Component({
    selector: 'datos-persona-form',
    templateUrl: './datos-persona.html',
    styleUrls: ['./datos-persona.css'],
    providers: [ValidarNumero, FormatObjetoAFecha]
})
export class DatosPersonaComponent implements OnInit {
    /**
     * @var datosPersoa Variable que contiene el formulario de persona
     * @var submitted indica el estado del envio del formulario
     */
    @Input("group") public datosPersona: FormGroup;
    @Input("submitted") public submitted;
    
    /**
     * @var cuil_medio String que guarda el documento para el numero de cuil
     * @var sexoLista Object listado de sexo
     * @var generoLista Object listado de genero
     * @var estadoCivilLista Object listado de estado civil
     */
    public cuil_medio = '';
    public sexoLista:Object = [];
    public generoLista:Object = [];
    public estadoCivilLista:Object = [];

    /**
     * 
     * @param _validarNumero funcion que verifica si los datos ingresado son números
     * @param _formatFecha funcion que formatea la fecha a un string
     * @param _sexoService servicio para obtener las funciones de sexo
     * @param _generoService servicio para obtener las funciones par del genero
     * @param _estadoCivilService servicio para obtener las funciones de estado civil
     */
    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha,
        private _sexoService: SexoService,
        private _generoService: GeneroService,
        private _estadoCivilService: EstadoCivilService,
    ){}

    ngOnInit(){
        this.listarSexo();
        this.listarGenero();
        this.listarEstadoCivil();
    }
    /**
     * @function persona se utiliza para controlar el objeto del formulario de persona
     */
    get persona() { return this.datosPersona.controls; }

    /*** Listas para el compoente  ***/

    /**
     * @function listarSexo obtiene el listado de sexo
     */
    listarSexo(){
        this._sexoService.listado().subscribe(
            datos => {
                this.sexoLista = datos;
        }, error => {
            console.log("error del sistema");
        });
    }
    /**
     * @function listarGenero obtiene el listado de genero
     */
    listarGenero() {
        this._generoService.listado().subscribe(
            datos => {
                this.generoLista = datos;
            }, error => {
                console.log("error del sistema");
            });
    }
    /**
     * @function listarGenero obtiene el listado de genero
     */
    listarEstadoCivil() {
        this._estadoCivilService.listado().subscribe(
            datos => {
                this.estadoCivilLista = datos;
            }, error => {
                console.log("error del sistema");
            });
    }

    /*** Funciones para el compoente  ***/

    /**
     * @function formatFechaNaciento convierte la fecha en un string
     * @param obj la fecha viene en formato objeto
     */
    formatFechaNacimiento(obj:any){
        this.datosPersona.controls.fecha_nacimiento.setValue(this._formatFecha.onChange(obj));
    }
    /**
     * @function esNumero valida si el valor del objeto es de tipo numero
     * @param obj objeto que contiene los valores del input.
     */
    esNumero(obj:any) {
        if (!this._validarNumero.onKey(obj.value)) {
            obj.value = obj.value.substring(0,obj.value.length - 1);
        } 
    }
    /**
     * @function validarCuil verifica la validación de cuil, si el cuil tiene 7 digitos los rellena con ceros
     * @param nroDocumento string utilizado para la validacion del número de documento
     */
    validarCuil(nroDocumento){
        if (nroDocumento.length == 7) {
            this.cuil_medio = '0' + nroDocumento;
        }else{
            this.cuil_medio = nroDocumento;
        }
        return this.cuil_medio;
    }
    /**
     * @function armarCuil funcion que arma el cuil uniendo las variables de los formularios
     */
    armarCuil(){
        let cuil_primero = this.datosPersona.value.cuil_prin;
        let cuil_ult = this.datosPersona.value.cuil_ult;
        let cuil = '';
        // verifico si las variables son distintas a vacio
        // si la validacion es correcta seteo el valor del formulario con el cuil armado
        if (cuil_primero != '' && cuil_ult != '') {
            cuil = cuil_primero + this.cuil_medio + cuil_ult;
            return this.datosPersona.controls.cuil.setValue(cuil);
        }else{ // si esta vacio seteo el valor del formulario en vacion
            return this.datosPersona.controls.cuil.setValue('');
        }
    }


}
