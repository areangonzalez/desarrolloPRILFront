import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PermisoService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/permisos');
    }
}
