import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartidoService {

  constructor() { }
  miVariable:number
  setVariable(valor: number) {
    this.miVariable = valor;
  }
}
