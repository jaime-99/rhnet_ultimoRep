import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-reservacion-salas',
  templateUrl: './reservacionSalas.component.html',
  styleUrls: ['./reservacionSalas.component.scss'],
})
export class ReservacionSalasComponent implements OnInit {
  reservaciones: any[] = [];

  constructor (private rhnet:RhnetService) {}

  ngOnInit(): void {

    // this.getJuntas()
  }

  getJuntas(){

    this.rhnet.getJuntas().subscribe((res)=>{
      this.reservaciones = res
      // console.log(res)
    })


  }

}
