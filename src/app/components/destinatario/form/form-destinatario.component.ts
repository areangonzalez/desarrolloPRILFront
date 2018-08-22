import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
// services
import { MensajesService } from "../../../services/mensajes.service";
// models
import { Hogar } from "./../../../models/hogar.model";
import { Estudio } from "../../../models/estudio.model";
import { Persona } from "../../../models/persona.model";
import { Destinatario } from "../../../models/destinatario.model"; 
//modal
import { ModalContentEstudio, ModalEstudioComponent } from "../form/modal-estudio/modal-estudio.component";
// services
import { DestinatarioService } from "../../../services/destinatario.service";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.html',
    styleUrls: ['./form-destinatario.css'],
    entryComponents: [ModalContentEstudio]
})
@Injectable()
export class FormDestinatarioComponent implements OnInit {
    /**
     * @var variable que obtiene el formulario.
     */
    destinatarioForm: FormGroup;
    listaEstudios = [];

    /**
     * @param _breadcrumbsService Servicio que maneja el camino de las paginas accedidas.
     * @param _router Servicio para la navegacion dentro del sistema
     * @param _fb servicio para la construccion de un formulario customizado
     * @param _destinatarioService Servicio que otorga la conexión con el servidor para las llamadas ajax
     */
    constructor(
        private _router:Router,
        private _breadcrumbsService: BreadcrumbsService,
        private _fb: FormBuilder,
        private _mensajeService: MensajesService,
        private _destinatarioService: DestinatarioService
    ){
        this.destinatarioForm = _fb.group({
            persona: _fb.group({
                nro_documento: ['', [Validators.required, Validators.minLength(7)]],
                cuil: '',
                cuil_prin: ['', [Validators.required, Validators.minLength(2)]],
                cuil_ult: ['', [Validators.required, Validators.minLength(1)]],
                apellido: ['', [Validators.required, Validators.minLength(3)]],
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                fechaNacimiento: ['', Validators.required],
                fecha_nacimiento: '',
                sexoid: ['', Validators.required],
                generoid: ['', Validators.required],
                estado_civilid: ['', Validators.required],
                telefono: '',
                celular: '',
                email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
                hogar: _fb.group({
                    localidadid: ['', Validators.required],
                    calle: ['', [Validators.required, Validators.minLength(3)]],
                    altura: ['', Validators.required],
                    barrio: ['', [Validators.required, Validators.minLength(3)]],
                    piso: '',
                    departamento: ''
                })
            }),
            destinatario: _fb.group({
                origen: ['', [Validators.required]],
                fechaPresentacion: ['', Validators.required],
                fecha_presentacion: '',
                deseo_actividad: ['', [Validators.required, Validators.minLength(3)]],
                deseo_lugar_entrenamiento: '',
                profesion: ['', Validators.required],
                oficio: ['', Validators.required],
                experiencia_laboral: [false, Validators.required],
                conocimientos_basicos: ['', [Validators.required, Validators.minLength(3)]],

            })
        });
    }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Destinatario', url: 'destinatario', params: [] }, { label: 'Agregar', url: 'destinatario/agregar', params: [] }]);
    }

    volver() {
        this._router.navigate(['destinatario']);
    }

    submitted = false;
    onSubmit() {
        const params = { persona: this.prepararPersona(), destinatario: this.prepararDestinatario() };
        this.submitted = true;
        
        if (this.destinatarioForm.invalid) {
            this._mensajeService.cancelado('Campos sin completar.');
            return;
        }else{
            
            this.guardarDestinatario(params,0);
        }
    }


    private guardarDestinatario(params:object, id:number){
        this._destinatarioService.guardar(params,id).subscribe(
            datos => {
                console.log(datos);
                this._mensajeService.exitoso('guardado Exitoso.');
        })
    }

    private prepararDestinatario() {
        return new Destinatario(0,{},'','','',0,0,false,'').deserialize(this.destinatarioForm.value.destinatario);
    }

    private prepararPersona() {

        let hogar = new Hogar(0,'','','','','').deserialize(this.destinatarioForm.value.persona.hogar);
        return new Persona('','','','','',0,0,0,'','','',hogar, this.listaEstudios ).deserialize(this.destinatarioForm.value.persona);
    }
}