import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// ES UN SERVICIO PARA COMPARTIR VARIABLES, ETC..
export class ServicioCompartidoService {

  constructor() { }
  miVariable:number
  setVariable(valor: number) {
    this.miVariable = valor;
  }
}
