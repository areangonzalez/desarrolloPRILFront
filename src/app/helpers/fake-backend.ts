import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        // listados de datos agregados
        let destinatarioLista: any =  { success: true, resultado: JSON.parse(localStorage.getItem('destinatarioLista')) } || {success: false, resultado:{}};
        let ambienteLista: any[] = JSON.parse(localStorage.getItem('ambienteLista')) || [];
        let ofertasLista: any[] = JSON.parse(localStorage.getItem('ofertasLista')) || [];
        // Agregados
        let destinatarioAgregados: any[] = JSON.parse(localStorage.getItem('destinatariosAgregados')) || [];
        let ambientesAgregados: any[] = JSON.parse(localStorage.getItem('ambientesAgregados')) || [];
        let ofertasAgregadas: any[] = JSON.parse(localStorage.getItem('ofertasAgregadas')) || [];
        // listados globales
        let profesion: any[] = [{ id: 1, nombre: 'Abogado'},{ id: 3, nombre: 'Agrónomo'},{ id: 4, nombre: 'Bacteriólogo' },{ id: 5, nombre: 'Biofísico' },
            { id: 6, nombre: 'climatologo' },{ id: 7, nombre: 'Cirujano' },{ id: 8, nombre: 'Dentista' },{ id: 9, nombre: 'Doctor' },{ id: 10, nombre: 'Enfermero' }];
        let oficio: any[] = [{ id: 1, nombre: 'Albañil' },{ id: 2, nombre: 'Arbitro' },{ id: 3, nombre: 'Banquero' },{ id: 4, nombre: 'Bailarin' },{ id: 5, nombre: 'Cantante' },
            { id: 6, nombre: 'Carpintero' },{ id: 7, nombre: 'Electricista' },{ id: 8, nombre: 'Escritor' },{ id: 9, nombre: 'Farmacéutico' },{ id: 10, nombre: 'Florista' }];
        let sexo: any[] = [{ id: 1, nombre: "Hombre"}, {id: 2, nombre: "Mujer"}];
        let genero: any[] = [{ id: 1, nombre: "Femenino" }, { id: 2, nombre: "Masculino" }];
        let estadoCivil: any[] = [{ id: 1, nombre: "Casado/a" }, { id: 2, nombre: "Soltero/a" }, { id: 2, nombre: "Viudo/a" }];
        let localidad: any[] = [{ id: 1, nombre: "Bariloche" }, { id: 2, nombre: "Cipolletti" }, { id: 3, nombre: "Gral. Roca" }, { id: 4, nombre: "Viedma" }];
        let nivelEducativo: any[] = [{ id: 1, nombre: "Primaria" }, { id: 2, nombre: "Secundaria" }, { id: 3, nombre: "Terciaria" }, { id: 3, nombre: "Universitaria" }];
        let tipoAmbienteTrabajoLista: any[] = [{ id: 1, nombre: 'Comisión de fomento' }, { id: 1, nombre: 'Empleador privado' },{ id: 1, nombre: 'Empresa' }, { id: 1, nombre: 'Institución gubernamental' },{ id: 1, nombre: 'Institución sin fines de lucro' }, { id: 1, nombre: 'Municipio' }]
        // datos adicionales
        let personas: any[] = [{ id: 1, nombre: "Romina", apellido: "Rodríguez", nro_documento: "29890098", fecha_nacimiento: "1980-12-12", telefono: "2920430690", celular: "2920412127", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "rr1980@gmail.com", cuil: "20298900988", estudios: [{ anio: "2013", nivel_educativoid: 1, nivel_educativo: 'Primaria', titulo: "grado", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 1, barrio: "Santa Clara", calle: "misiones", altura: "27", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 2, nombre: "Juan jose", apellido: "Casillas", nro_documento: "29232132", fecha_nacimiento: "1985-10-23", telefono: "2920430753", celular: "2920412265", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "jjcasillas@gmail.com", cuil: "20292321328", estudios: [{ anio: "2013", nivel_educativoid: 2, nivel_educativo: 'Secundaria', titulo: "bachiller en economía financiera", completo: false, en_curso: true, fecha: "2014-12-20" }], lugar: { id: 2, barrio: "Don bosco", calle: "Mitre", altura: "327", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 3, nombre: "Carlos", apellido: "Mansilla", nro_documento: "29857364", fecha_nacimiento: "1988-05-14", telefono: "2920430132", celular: "2920412628", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "carlosmansilla@gmail.com", cuil: "20298573648", estudios: [{ anio: "2013", nivel_educativoid: 3, nivel_educativo: 'Terciaria', titulo: "tecnico en desarrollo web", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 3, barrio: "Fátima", calle: "san luis", altura: "1032", escalera: '', piso: "", depto: "", localidadid: 1 } }];


        /*** Funciones para el uso de datos ***/

        function generarId(listado){
            let count = listado.length;
            return count + 1;
        }

        function getNombreArray(id, listado){
            let seleccion: '';
            // busco el elemento en la lista
            for (var key in listado) {
                // verifico que exista el elemento
                if (listado[key].id == id) {
                    seleccion = listado[key].nombre;
                }
            }

            return (seleccion != '')?seleccion:'';
        }

        function obtenerUltimoEstudio(estudio){
            let anio = 0;
            let seleccion:any;
            for (var i in estudio) {
                if (parseInt(estudio[i].anio) > anio) {
                    anio = parseInt(estudio[i].anio);
                    seleccion = estudio[i];
                }
            }

            return seleccion;
        }

        function concatEstudio(obj) {
            let texto = '';
            for (var clave in obj) {
                if (clave == 'nivel_educativoid') {
                    texto += '';
                }else if (clave == 'en_curso'){
                    texto+='';
                }else if (clave == 'completo') {
                    if (obj[clave] == true) {
                        texto += 'completo';
                    }else{
                        texto += 'en curso';
                    }
                }else if (clave == 'anio'){
                    if (obj['anio'] != '') {
                        texto += obj.anio
                    }
                }else{
                    texto += obj[clave];
                }
                texto+=' ';
            }
            return texto;
        }

        function hoy() {
            let fecha = new Date();
            return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
        }

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

        /* ************************************************************************
         *                                LOGIN 
         * ************************************************************************ */
            // authenticate
            if (request.url.endsWith('/apimock/usuario/login') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password_hash === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { access_token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
        /* ************************************************************************
         *                                DESTINATARIO 
         * ************************************************************************ */
            // lista de destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: destinatarioLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Agregar destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'POST') {
                // get new user object from post body
                let newDestinatario = request.body;
                //console.log("respuesta post: ", destinatarioLista);
                // validation
                let duplicateUser = destinatarioLista.resultado.filter(destinatario => { return destinatario.nro_documento === newDestinatario.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.persona.nro_documento + '" ya existe' } });
                }


                // save new user
                // array de la tabla Listado de la tabla
                newDestinatario.destinatario.id = generarId(destinatarioLista.resultado);
                newDestinatario.persona.lugar.id = generarId(destinatarioLista.resultado);
                personas.push(newDestinatario.persona);

                destinatarioLista.resultado.push({
                    id: newDestinatario.destinatario.id,
                    oficioid: 4,
                    legajo: newDestinatario.destinatario.legajo,
                    calificacion: null,
                    profesionid: newDestinatario.destinatario.profesionid,
                    fecha_ingreso: hoy(),
                    origen: newDestinatario.destinatario.origen,
                    observacion: newDestinatario.destinatario.observacion,
                    deseo_lugar_entrenamiento: newDestinatario.destinatario.deseo_lugar_entrenamiento,
                    deseo_actividad: newDestinatario.destinatario.deseo_actividad,
                    fecha_presentacion: newDestinatario.destinatario.fecha_presentacion,
                    personaid: 64,
                    banco_cbu: newDestinatario.destinatario.banco_cbu,
                    banco_nombre: newDestinatario.destinatario.banco_nombre,
                    banco_alias: newDestinatario.destinatario.banco_alias,
                    experiencia_laboral: (newDestinatario.destinatario.experiencia_laboral == true)?1:0,
                    conocimientos_basicos: newDestinatario.destinatario.conocimientos_basicos,
                    profesion: getNombreArray(newDestinatario.destinatario.profesionid, profesion),
                    oficio: getNombreArray(newDestinatario.destinatario.oficioid, oficio),
                    dato_extra: {
                        nombre: newDestinatario.persona.nombre,
                        apellido: newDestinatario.persona.apellido,
                        telefono: newDestinatario.persona.telefono,
                        celular: newDestinatario.persona.celular,
                        email: newDestinatario.persona.email,
                        nro_documento: newDestinatario.persona.nro_documento,
                        cuil: newDestinatario.destinatario.cuil,
                        fecha_nacimiento: newDestinatario.destinatario.fecha_nacimiento,
                        direccion: getNombreArray(newDestinatario.persona.lugar.localidadid, localidad) + '<br>' + newDestinatario.persona.lugar.barrio + '<br>' + newDestinatario.persona.lugar.calle + '<br>' + newDestinatario.persona.lugar.altura + '<br>' + (newDestinatario.persona.lugar.escalera != "") ? newDestinatario.persona.lugar.escalera : "" + '<br>' + (newDestinatario.persona.lugar.piso != "") ? newDestinatario.persona.lugar.piso : "" + '<br>' + (newDestinatario.persona.lugar.depto != "") ? newDestinatario.persona.lugar.depto : "",
                    }                                   
                });
                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista.resultado));
                // datos de usuarios agregados
                destinatarioAgregados.push(newDestinatario);
                localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // conseguir destinatario por id
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = destinatarioAgregados.filter(destinatario => { return destinatario.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;

                    if (seleccion != null ) {
                        delete seleccion.persona.cuil_prin;
                        delete seleccion.persona.cuil_ult;
                        delete seleccion.persona.fechaNacimiento;
                        delete seleccion.destinatario.fechaPresentacion;
                        delete seleccion.id;
                        seleccion.persona['id'] = generarId(destinatarioLista);
                        // agrego datos al array
                        seleccion.persona.sexo = getNombreArray(seleccion.persona.sexoid, sexo);
                        seleccion.persona.genero = getNombreArray(seleccion.persona.generoid, genero);
                        seleccion.persona.estado_civil = getNombreArray(seleccion.persona.estado_civilid, estadoCivil);
                        seleccion.persona.lugar.localidad = getNombreArray(seleccion.persona.lugar.localidadid, localidad);
                        seleccion.destinatario.profesion = getNombreArray(seleccion.destinatario.profesionid, profesion);
                        seleccion.destinatario.oficio = getNombreArray(seleccion.destinatario.oficioid, oficio);
                    }
                    console.log(seleccion);
                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Editar destinatario
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'PUT') {
                
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                
                // consigo el destinatario a editar en la respuesta
                let editDestinatario = request.body;
                // busco en el listado el destinatario
                let estudioDestinatario = (editDestinatario.persona.estudios.length > 0) ? obtenerUltimoEstudio(editDestinatario.persona.estudios) : null;
                for (var i = 0; i < destinatarioLista.length; i++) {
                    if(destinatarioLista[i]['id'] == id){
                            destinatarioLista[i] = {
                                id: id,
                                nro_documento: editDestinatario.persona.nro_documento,
                                apellido: editDestinatario.persona.apellido,
                                nombre: editDestinatario.persona.nombre,
                                direccion: editDestinatario.persona.lugar.calle + ' ' + editDestinatario.persona.lugar.altura,
                                telefono: editDestinatario.persona.telefono,
                                celular: editDestinatario.persona.celular,
                                profesion: getNombreArray(editDestinatario.destinatario.profesionid, profesion),
                                oficio: getNombreArray(editDestinatario.destinatario.oficioid, oficio),
                                presentacion: editDestinatario.destinatario.fecha_presentacion,
                                estudio: (estudioDestinatario != null) ? concatEstudio(estudioDestinatario) : ''
                            }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < destinatarioAgregados.length; d++) {
                    if (destinatarioAgregados[d]['id'] == id ){
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editDestinatario['id'] = id;
                        destinatarioAgregados.splice(d, 1, editDestinatario);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

        /* ************************************************************************
         *                            AMBIENTE DE TRABAJO 
         * ************************************************************************ */
            // lista de ambientes de trabajos
            if (request.url.endsWith('/ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: ambienteLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }            

            // Crear ambiente de trabajo
            if (request.url.endsWith('/ambiente-trabajos') && request.method === 'POST') {
                // get new user object from post body
                let newAmbiente = request.body;
                // save new user
                // array de la tabla
                newAmbiente.ambiente.id = generarId(ambienteLista);
                newAmbiente.persona.id = generarId(ambienteLista);
                newAmbiente.ambiente.lugar.id = generarId(ambienteLista);
                ambienteLista.push({
                    id: newAmbiente.ambiente.id,
                    nro_documento: newAmbiente.persona.nro_documento,
                    apellido: newAmbiente.persona.apellido,
                    nombre: newAmbiente.persona.nombre,
                    direccion: newAmbiente.ambiente.lugar.calle + ' ' + newAmbiente.ambiente.lugar.altura,
                    telefono: newAmbiente.persona.telefono,
                    celular: newAmbiente.persona.celular,
                    fax: newAmbiente.persona.fax,
                    tipo: getNombreArray(newAmbiente.ambiente.tipo_ambiente_trabajoid, tipoAmbienteTrabajoLista),
                    nombre_ambiente: newAmbiente.ambiente.nombre,
                    cuit: newAmbiente.ambiente.cuit,
                    estado: 'Activo'
                });
                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(ambienteLista));
                // datos de usuarios agregados
                ambientesAgregados.push(newAmbiente);
                localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // conseguir AMBIENTE DE TRABAJO por id
            if (request.url.match(/\/ambiente\-trabajos\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let mensaje = 'No existe este ambiente';
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);                    
                    let matchedUsers = ambientesAgregados.filter(ambiente => { return ambiente.ambiente.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;
                    let resultado: any = [];
                    if (seleccion != null) {
                        delete seleccion.ambiente.lugar.usarLugarEncontrado;
                        resultado.push({ estado: true, resultado: [seleccion] });
                    } else {
                        resultado.push({ estado: false, resultado: [], message: mensaje });
                    }

                    return of(new HttpResponse({ status: 200, body: resultado[0] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Editar ambiente trabajo
            if (request.url.match(/\/ambiente\-trabajos\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // consigo el destinatario a editar en la respuesta
                let editAmbiente = request.body;
                // busco en el listado el destinatario
                for (var i = 0; i < ambienteLista.length; i++) {
                    if (ambienteLista[i]['id'] == id) {
                        ambienteLista[i] = {
                            id: editAmbiente.ambiente.id,
                            nro_documento: editAmbiente.persona.nro_documento,
                            apellido: editAmbiente.persona.apellido,
                            nombre: editAmbiente.persona.nombre,
                            direccion: editAmbiente.ambiente.lugar.calle + ' ' + editAmbiente.ambiente.lugar.altura,
                            telefono: editAmbiente.persona.telefono,
                            celular: editAmbiente.persona.celular,
                            fax: editAmbiente.persona.fax,
                            tipo: getNombreArray(editAmbiente.ambiente.tipo_ambiente_trabajoid, tipoAmbienteTrabajoLista),
                            nombre_ambiente: editAmbiente.ambiente.nombre,
                            cuit: editAmbiente.ambiente.cuit,
                            estado: 'Activo'
                        }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < ambientesAgregados.length; d++) {
                    if (ambientesAgregados[d]['ambiente']['id'] == id) {
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editAmbiente.ambiente['id'] = id;
                        ambientesAgregados.splice(d, 1, editAmbiente);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(ambienteLista));
                // datos de usuarios agregados
                localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

        /* ************************************************************************
         *                                  OFERTAS
         * ************************************************************************ */
            
            // Buscar ofertas por ambiente
            if (request.url.endsWith('/ofertas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let ambienteId = request.params.get('ambienteid');
                    //let mensaje: string = 'Este ambiente no existe.';

                    let matchedAmbiente = ofertasLista.filter(ofertas => { return ofertas.ambienteid === ambienteId; });
                    let seleccion = matchedAmbiente.length ? matchedAmbiente : [];

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Crear ofertas
            if (request.url.endsWith('/ofertas') && request.method === 'POST') {
                // get new user object from post body
                let newOfertas = request.body;
                // save new user
                // array de la tabla
                // genero la lista de ofertas
                newOfertas.id = generarId(ofertasAgregadas);
                newOfertas.fecha_inicial = hoy();
                
                ofertasLista.push({
                    id: newOfertas.id,
                    ambienteid: newOfertas.ambienteid,
                    ambiente: getNombreArray(newOfertas.ambienteid, ambientesAgregados),
                    nombre_sucursal: newOfertas.nombre_sucursal,
                    puesto: newOfertas.puesto,
                    area: newOfertas.area,
                    demanda_laboral: newOfertas.demanda_laboral,
                    objetivo: newOfertas.objetivo,
                    dia_horario: newOfertas.dia_horario,
                    tarea: newOfertas.tarea,
                    fecha_inicial: newOfertas.fecha_inicial,
                    estado: 'Vacante',
                    lugar: {
                        id: newOfertas.id,
                        localidadid: newOfertas.localidadid,
                        localidad: getNombreArray(newOfertas.localidadid, localidad),
                        calle: newOfertas.calle,
                        altura: newOfertas.altura,
                        barrio: newOfertas.barrio,
                        piso: newOfertas.piso,
                        depto: newOfertas.depto,
                        escalera: newOfertas.escalera
                    }
                });
                // datos a mostrar en la tabla
                localStorage.setItem('ofertasLista', JSON.stringify(ofertasLista));
                // datos de usuarios agregados
                console.log(newOfertas);
                ofertasAgregadas.push(newOfertas);
                localStorage.setItem('ofertasAgregadas', JSON.stringify(ofertasAgregadas));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // conseguir OFERTA por id
            if (request.url.match(/\/ofertas\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedOferta = ofertasAgregadas.filter(oferta => { return oferta.id === id; });
                    let seleccion = matchedOferta.length ? matchedOferta[0] : null;

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Editar Oferta
            if (request.url.match(/\/ofertas\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // consigo el destinatario a editar en la respuesta
                let editOferta = request.body;
                
                // busco en el listado el destinatario
                for (var i = 0; i < ofertasLista.length; i++) {
                    if (ofertasLista[i]['id'] == id) {
                        ofertasLista[i] = {
                            id: editOferta.id,
                            ambienteid: editOferta.ambienteid,
                            ambiente: getNombreArray(editOferta.ambienteid, ambientesAgregados),
                            nombre_sucursal: editOferta.nombre_sucursal,
                            puesto: editOferta.puesto,
                            area: editOferta.area,
                            demanda_laboral: editOferta.demanda_laboral,
                            objetivo: editOferta.objetivo,
                            dia_horario: editOferta.dia_horario,
                            tarea: editOferta.tarea,
                            fecha_inicial: hoy(),
                            estado: 'Vacante',
                            lugar: {
                                id: editOferta.id,
                                localidadid: editOferta.localidadid,
                                localidad: getNombreArray(editOferta.localidadid, localidad),
                                calle: editOferta.calle,
                                altura: editOferta.altura,
                                barrio: editOferta.barrio,
                                piso: editOferta.piso,
                                depto: editOferta.depto,
                                escalera: editOferta.escalera
                            }
                        }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < ofertasAgregadas.length; d++) {
                    if (ofertasAgregadas[d]['id'] == id) {
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editOferta['id'] = id;
                        editOferta['fecha_inicial'] = ofertasAgregadas[d]['id']['fecha_inicial'];
                        ofertasAgregadas.splice(d, 1, editOferta);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('ofertasLista', JSON.stringify(ofertasLista));
                // datos de usuarios agregados
                localStorage.setItem('ofertasAgregadas', JSON.stringify(ofertasAgregadas));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

        /* ************************************************************************
         *                                  PERSONAS
         * ************************************************************************ */
            // Buscar personas
            if (request.url.endsWith('/personas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let nro_documento = request.params.get('nro_documento');
                    let mensaje:string = 'Esta persona no existe.';

                    let matchedUsers = personas.filter(persona => { return persona.nro_documento === nro_documento; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;
                    let resultado:any = [];
                    if (seleccion != null) {
                        resultado.push({estado:true, resultado:[seleccion]});
                    }else{
                        resultado.push({ estado: false, resultado: [], message:mensaje});                        
                    }

                    return of(new HttpResponse({ status: 200, body: resultado[0] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

        /* ************************************************************************
         *                             LISTADOS GENERALES
         * ************************************************************************ */

            // lista tipos de ambientes de trabajos
            if (request.url.endsWith('/tipo-ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: tipoAmbienteTrabajoLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // profesiones
            if (request.url.endsWith('/profesions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: profesion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // oficios
            if (request.url.endsWith('/oficios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: oficio }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //sexo
            if (request.url.endsWith('/sexos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: sexo }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // genero
            if (request.url.endsWith('/generos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: genero }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Estado Civil
            if (request.url.endsWith('/estado-civils') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: estadoCivil }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //localidades
            if (request.url.endsWith('/localidads') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: localidad }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //Nivel educativo
            if (request.url.endsWith('/nivel-educativos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: nivelEducativo }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};