import { Injectable } from '@angular/core';
import { PersonRh } from './interfaces/personRHnet.component';
import { RhnetService } from './rhnet.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor( public rhService: RhnetService) { }

  private persona:PersonRh[] = [];

  // getPeople(): Promise<PersonRh[]> {
  //   if (this.persona.length === 0) {
  //     // Si la lista de personas está vacía, solicita los datos a la API y guárdalos
  //     return this.rhService.getAllInfoEmpleados.toPromise().then((data) => {
  //       this.persona = data;
  //       return this.persona;
  //     });
  //   } else {
  //     // Si la lista ya contiene datos, devuélvelos directamente
  //     return Promise.resolve(this.persona);
  //   }
  // }

  // getPersonById(id: number): PersonRh | undefined {
  //   return this.persona.find((person) => person.id === id);
  // }



}
