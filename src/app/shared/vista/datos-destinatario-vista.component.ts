
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'datos-destinatario-vista',
    templateUrl: './datos-destinatario-vista.component.html',
    styleUrls: ['./datos-destinatario-vista.component.css'],
    providers: [NgbTooltipConfig]
})
export class DatosDestinatarioVistaComponent {
    @Input("destinatario") public destinatario:any;
    //title = 'app';
    private id: any;
    private idDestinatario = '';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }
}
