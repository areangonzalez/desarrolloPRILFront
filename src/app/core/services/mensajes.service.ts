import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alert, AlertType, IUrl } from "../models";

@Injectable()
export class MensajesService {
    private subject = new Subject<any>();
    // variables para los alert de confirmación
    private respuestaConfirmacion = new Subject<any>();



    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    alert(tipo: AlertType, mensaje: string, url: IUrl){
        this.subject.next(<Alert>{tipo:tipo, mensaje:mensaje, urlLink:url})
    }

    exitoso(mensaje: string, url: IUrl){
        this.alert(AlertType.Exitoso, mensaje, url);
    }
    cancelado(mensaje: string, url: IUrl) {
        this.alert(AlertType.Cancelado, mensaje, url);
    }
    ofrecer(mensaje: string, url: IUrl) {
        this.alert(AlertType.Ofrecer, mensaje, url);
    }

}
