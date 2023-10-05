import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeNuloMovimientoService {
  public message =false
  constructor() { }

  setMessage() {
    this.message = true;
    console.log('Mensaje establecido:', this.message);
  }


  getMessage() {
    console.log('Mensaje obtenido:', this.message); // Agrega este console.log
    return this.message;
  }

}

