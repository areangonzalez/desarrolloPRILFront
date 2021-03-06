import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from "./login.component";
//import { SharedModule } from "../shared";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
    imports: [
      CommonModule,
      FormsModule, ReactiveFormsModule,
      LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class LoginModule {
    constructor() {
    }
 }
