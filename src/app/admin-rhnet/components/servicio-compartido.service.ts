import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// ES UN SERVICIO PARA COMPARTIR VARIABLES, ETC..
export class ServicioCompartidoService {

  constructor() { }
  miVariable:number
  correoJefe:string
  setVariable(valor: number,correoJefe:string) {
    this.miVariable = valor;
    this.correoJefe = correoJefe
  }
}
