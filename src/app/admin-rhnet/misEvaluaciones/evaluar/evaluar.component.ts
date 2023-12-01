import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss'],
})
export class EvaluarComponent implements OnInit {
  elementos: any; // esto son mis elementos
  checkboxesEstado: { [key: number]: boolean } = {}; // es para marcar los checkbox

  Competencia = [
    { id: 1, competencia: 'Habilidades', descripcion:'se evaluara las Habilidades del becario' },
    { id: 2, competencia: 'Aptitudes' , descripcion: 'Se evaluara las aptitudes de becario'},
    { id: 3, competencia: 'Actitudes', descripcion: 'Se evaluara las actitudes de becario' }
    // Agrega más universidades según sea necesario
  ];
  // elemento: any;
  numEvaluacion: any;


  constructor (private rhnetService:RhnetService, public route:ActivatedRoute) {}



  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const evaluacion = params['evaluacion'];
      console.log('Evaluacion:', evaluacion);
      this.numEvaluacion = evaluacion

      // Realiza las acciones necesarias con el parámetro
    });

    this.getCompetencias();

  }

  getCompetencias(){
    this.rhnetService.getCompetencias().subscribe((res)=>{
      this.elementos = res
      console.log( "estas son mis elementos", this.elementos)
    })

    this.comptenecias()
  }

  // agregar evaluacion
  agregarEvaluacion() {
  //   const id_becario = 1; // Reemplaza con el valor correcto
  //   const observacion = 'Observación de prueba'; // Reemplaza con el valor correcto
  //   const elementosSeleccionados = [1, 2, 3]; // Reemplaza con el valor correcto

  //   this.rhnetService.insertarEvaluacion(id_becario, observacion, elementosSeleccionados)
  //     .subscribe(response => {
  //       console.log(response); // Maneja la respuesta según tu necesidad
  //     });
  // }

  const elementosSeleccionados = this.elementos
      .filter(habilidad => this.checkboxesEstado[habilidad.id])
      .map(habilidad => habilidad.id);


    // Aquí puedes enviar elementosSeleccionados a tu servicio para la inserción
    console.log(elementosSeleccionados);
}


comptenecias(){

    // Filtras las habilidades por id_competencia
    const habilidades = this.elementos.filter(h => h.id_competencia ===1);
    console.log(habilidades)

    // Ahora puedes hacer algo con las habilidades, por ejemplo, imprimir en la consola
  };


}



