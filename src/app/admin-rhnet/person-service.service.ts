import { Injectable } from '@angular/core';
import { PersonRh } from './interfaces/personRHnet.component';
import { RhnetService } from './rhnet.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor( public rhService: RhnetService) { }

  private persona:PersonRh[]


}
