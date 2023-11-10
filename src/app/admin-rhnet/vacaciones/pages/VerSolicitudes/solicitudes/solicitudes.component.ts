import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/admin-rhnet/person-service.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  constructor(private personService:PersonService) { }

  ngOnInit(): void {


    this.personService.informacion()





  }

}
