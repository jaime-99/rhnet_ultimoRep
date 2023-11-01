import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';


@Component({
  selector: 'app-pases-autorizados',
  templateUrl: './pases-autorizados.component.html',
  styleUrls: ['./pases-autorizados.component.scss']
})
export class PasesAutorizadosComponent implements OnInit {

  pasesAutorizados = []

  constructor(private rhnetService: RhnetService ) { }

  ngOnInit(): void {

    this.getPasesAutorizados();

  }

  //son los pases que son han sido autorizados
  getPasesAutorizados(){

    this.rhnetService.getPasesAutorizados().subscribe((res => {
      this.pasesAutorizados = res;

      const fechaHoy = new Date(); // Obtener la fecha actual en JavaScript
      const fechaHoyFormatted = fechaHoy.toISOString().slice(0, 10); // Formatear la fecha actual como "YYYY-MM-DD"

      // Filtrar los datos con la fecha del día presente
      this.pasesAutorizados = this.pasesAutorizados.filter(pase => {
        return pase.Fecha === fechaHoyFormatted; // Supongo que la propiedad se llama "Fecha"
      });
      // Ahora this.pasesAutorizados contiene solo los pases con la fecha de hoy
    }));


  }

  recargar(){
    this.getPasesAutorizados();
  }

}
