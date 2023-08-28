
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  esRelacionado: boolean = false;

  setEsRelacionado(value: boolean) {
    this.esRelacionado = value;
  }

  getEsRelacionado() {
    return this.esRelacionado;
  }
}
