import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class OficioService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    listarOficios() {
        return this._http.get(this.url + '/oficios');
    }


}