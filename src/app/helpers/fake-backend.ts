import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        let destinatarioLista: any[] = JSON.parse(localStorage.getItem('destinatarioLista')) || [];
        let destinatarioAgregados: any[] = JSON.parse(localStorage.getItem('destinatariosAgregados')) || [];
        let profesion: any[] = [{ id: 1, nombre: 'Abogado'},{ id: 3, nombre: 'Agrónomo'},{ id: 4, nombre: 'Bacteriólogo' },{ id: 5, nombre: 'Biofísico' },
            { id: 6, nombre: 'climatologo' },{ id: 7, nombre: 'Cirujano' },{ id: 8, nombre: 'Dentista' },{ id: 9, nombre: 'Doctor' },{ id: 10, nombre: 'Enfermero' }];
        let oficio: any[] = [{ id: 1, nombre: 'Albañil' },{ id: 2, nombre: 'Arbitro' },{ id: 3, nombre: 'Banquero' },{ id: 4, nombre: 'Bailarin' },{ id: 5, nombre: 'Cantante' },
            { id: 6, nombre: 'Carpintero' },{ id: 7, nombre: 'Electricista' },{ id: 8, nombre: 'Escritor' },{ id: 9, nombre: 'Farmacéutico' },{ id: 10, nombre: 'Florista' }];
        let sexo: any[] = [{ id: 1, nombre: "Hombre"}, {id: 2, nombre: "Mujer"}];
        let genero: any[] = [{ id: 1, nombre: "Femenino" }, { id: 2, nombre: "Masculino" }];
        let estadoCivil: any[] = [{ id: 1, nombre: "Casado/a" }, { id: 2, nombre: "Soltero/a" }, { id: 2, nombre: "Viudo/a" }];
        let localidad: any[] = [{ id: 1, nombre: "Bariloche" }, { id: 2, nombre: "Cipolletti" }, { id: 3, nombre: "Gral. Roca" }, { id: 3, nombre: "Viedma" }];
        let nivelEducativo: any[] = [{ id: 1, nombre: "Primaria" }, { id: 2, nombre: "Secundaria" }, { id: 3, nombre: "Terciaria" }, { id: 3, nombre: "Universitaria" }];
        let personas: any[] = [{ id: 1, nombre: "Romina", apellido: "Rodríguez", nro_documento: "29890098",fecha_nacimiento: "1980-12-12", telefono: "2920430690", celular: "2920412127", estado_civilid: 1, sexoid: 2, generoid: 1, email: "rr1980@gmail.com", cuil: "20298900988", estudios: [{ nivel_educativoid: 1, titulo: "grado", completo: true, en_curso: false, fecha: "2014-12-20" }], hogar: { barrio: "Santa Clara", calle: "misiones", altura: "27", piso: "", depto: "", localidadid: 1 } },{ id: 2, nombre: "Juan jose", apellido: "Casillas", nro_documento: "29232132", fecha_nacimiento: "1985-10-23", telefono: "2920430753", celular: "2920412265", estado_civilid: 1, sexoid: 2, generoid: 1, email: "jjcasillas@gmail.com", cuil: "20292321328", estudios: [{ nivel_educativoid: 2, titulo: "bachiller en economía financiera", completo: false, en_curso: true, fecha: "2014-12-20" }], hogar: { barrio: "Don bosco", calle: "Mitre", altura: "327", piso: "", depto: "", localidadid: 1 } },{ id: 3, nombre: "Carlos", apellido: "Mansilla", nro_documento: "29857364", fecha_nacimiento: "1988-05-14", telefono: "2920430132", celular: "2920412628", estado_civilid: 1, sexoid: 2, generoid: 1, email: "carlosmansilla@gmail.com", cuil: "20298573648", estudios: [{ nivel_educativoid: 3, titulo: "tecnico en desarrollo web", completo: true, en_curso: false, fecha: "2014-12-20" }], hogar: { barrio: "Fátima", calle: "san luis", altura: "1032", piso: "", depto: "", localidadid: 1 } }];


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

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

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

            // registrar destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'POST') {
                // get new user object from post body
                let newDestinatario = request.body;
                console.log("respuesta post: ", destinatarioLista);
                // validation
                let duplicateUser = destinatarioLista.filter(destinatario => { return destinatario.nro_documento === newDestinatario.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.persona.nro_documento + '" ya existe' } });
                }


                // save new user
                // array de la tabla
                //{ nro_documento: '33476725', apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000',
                // celular: '2920635572', profesion: 'Panadero', oficio: 'Pastelero', nivel_educativo: 'Terciario', presentacion: '19/06/2018', id: 1 }
                newDestinatario.id = generarId(destinatarioLista);
                destinatarioLista.push({
                    id: newDestinatario.id,
                    nro_documento: newDestinatario.persona.nro_documento,
                    apellido: newDestinatario.persona.apellido,
                    nombre: newDestinatario.persona.nombre,
                    direccion: newDestinatario.persona.hogar.calle + ' ' + newDestinatario.persona.hogar.altura,
                    telefono: newDestinatario.persona.telefono,
                    celular: newDestinatario.persona.celular,
                    profesion: getNombreArray(newDestinatario.destinatario.profesionid, profesion),
                    oficio: getNombreArray(newDestinatario.destinatario.oficioid, oficio),
                    presentacion: newDestinatario.destinatario.fecha_presentacion
                });
                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
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
                        console.log(seleccion);
                        delete seleccion.persona.cuil_prin;
                        delete seleccion.persona.cuil_ult;
                        delete seleccion.persona.fechaNacimiento;
                        delete seleccion.destinatario.fechaPresentacion;
                        delete seleccion.id;
                    }

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // registrar destinatario
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'PUT') {
                
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                
                // consigo el destinatario a editar en la respuesta
                let editDestinatario = request.body;
                // busco en el listado el destinatario
                for (var i = 0; i < destinatarioLista.length; i++) {
                    if(destinatarioLista[i]['id'] == id){
                            destinatarioLista[i] = {
                                id: id,
                                nro_documento: editDestinatario.persona.nro_documento,
                                apellido: editDestinatario.persona.apellido,
                                nombre: editDestinatario.persona.nombre,
                                direccion: editDestinatario.persona.hogar.calle + ' ' + editDestinatario.persona.hogar.altura,
                                telefono: editDestinatario.persona.telefono,
                                celular: editDestinatario.persona.celular,
                                profesion: getNombreArray(editDestinatario.destinatario.profesionid, profesion),
                                oficio: getNombreArray(editDestinatario.destinatario.oficioid, oficio),
                                presentacion: editDestinatario.destinatario.fecha_presentacion
                            }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < destinatarioAgregados.length; d++) {
                    if (destinatarioAgregados[d]['id'] == id ){
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editDestinatario['id'] = id;
                        destinatarioAgregados.splice(d,1,editDestinatario);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get personas
            if (request.url.endsWith('/personas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let nro_documento = request.body;
                    let mensaje:any = [{ mensaje: 'Esta persona no existe.'}];
                    console.log(nro_documento);

                    let matchedUsers = personas.filter(persona => { return persona.nro_documento === nro_documento; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;
                    if (seleccion != null) {
                        return of(new HttpResponse({ status: 200, body: [{resultado:[seleccion]}] }));
                    }else{
                        return of(new HttpResponse({ status: 200, body: mensaje }));
                    }

                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            /* LISTADOS */
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
            if (request.url.endsWith('/estado_civils') && request.method === 'GET') {
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