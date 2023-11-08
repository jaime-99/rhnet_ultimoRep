import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


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

  private eventSubject = new Subject<void>();

  emitEvent() {
    this.eventSubject.next();
  }
  getEvent() {
    return this.eventSubject.asObservable();
  }





}
