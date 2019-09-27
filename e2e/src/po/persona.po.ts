import { browser, by, element } from 'protractor';

export class AppPersona {
  formPersonaComp() {
    return element(by.tagName('datos-persona-form'));
  }

  documento(dato:string) {
    return this.formPersonaComp().element(by.id('nro_documento')).sendKeys(dato);
  }
  nroCuilPrincipio(dato:string) {
    return this.formPersonaComp().element(by.id('cuil_prin')).sendKeys(dato);
  }
  nroCuilFinal(dato:string) {
    return this.formPersonaComp().element(by.id('cuil_ult')).sendKeys(dato);
  }
  apellido(dato:string) {
    return this.formPersonaComp().element(by.id('apellido')).sendKeys(dato);
  }
  nombre(dato:string) {
    return this.formPersonaComp().element(by.id('nombre')).sendKeys(dato);
  }
  fechaNacimiento(dato:string) {
    return this.formPersonaComp().element(by.id('fecha_nacimiento')).sendKeys(dato);
  }
  estadoCivil(opcion:string) {
    return this.formPersonaComp().element(by.id('estado_civil')).element(by.cssContainingText('option', opcion)).click();
  }
  sexo(opcion:string) {
    return this.formPersonaComp().element(by.id('sexo')).element(by.cssContainingText('option', opcion)).click();
  }
  genero(opcion:string) {
    return this.formPersonaComp().element(by.id('genero')).element(by.cssContainingText('option', opcion)).click();
  }
  telefono(dato:string) {
    return this.formPersonaComp().element(by.id('telefono')).sendKeys(dato);
  }
  celular(dato:string) {
    return this.formPersonaComp().element(by.id('celular')).sendKeys(dato);
  }
  email(dato:string) {
    return this.formPersonaComp().element(by.id('email')).sendKeys(dato);
  }

}
