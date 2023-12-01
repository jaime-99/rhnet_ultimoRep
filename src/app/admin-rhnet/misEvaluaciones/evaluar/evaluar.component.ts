import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss'],
})
export class EvaluarComponent implements OnInit {
  elementos: any; // esto son mis elementos
  checkboxesEstado: { [key: number]: boolean } = {}; // es para marcar los checkbox
  public comentario:string;

  Competencia = [
    { id: 1, competencia: 'Habilidades', descripcion:'se evaluara las Habilidades del becario' },
    { id: 2, competencia: 'Aptitudes' , descripcion: 'Se evaluara las aptitudes de becario'},
    { id: 3, competencia: 'Actitudes', descripcion: 'Se evaluara las actitudes de becario' }
    // Agrega más universidades según sea necesario
  ];
  // elemento: any;
  numEvaluacion: any;
  habilidades1: any;
  habilidades2: any;
  habilidades3: any;
  advertencia: boolean = false;
  idBecario: any;


  constructor (private rhnetService:RhnetService, public route:ActivatedRoute,private location:Location) {}



  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const evaluacion = params['evaluacion'];
      const idBecario = params['idBecario'];
      this.idBecario = idBecario
      // console.log('Evaluacion:', evaluacion);
      console.log( "id de becario", idBecario)
      this.numEvaluacion = evaluacion

      // Realiza las acciones necesarias con el parámetro
    });

    this.getCompetencias();

  }

  getCompetencias(){
    this.rhnetService.getCompetencias().subscribe((res)=>{
      this.elementos = res
      // console.log( "estas son mis elementos", this.elementos)
      this.competencias()
    })

  }

  // agregar evaluacion
  agregarEvaluacion() {
    const id_becario = 1001; // Reemplaza con el valor correcto
    const observacion = 'Observación de prueba'; // Reemplaza con el valor correcto


    const elementosSeleccionados = this.elementos
    .filter(habilidad => this.checkboxesEstado[habilidad.id])
    .map(habilidad => habilidad.id);

    if(this.comentario.length<10){
      this.advertencia = true;
      return;
    }

    this.rhnetService.insertarEvaluacion(this.idBecario, this.comentario, elementosSeleccionados)
      .subscribe(response => {
        console.log(response); // Maneja la respuesta según tu necesidad

          // Aquí puedes acceder al id_evaluacion en tu componente
          const id_evaluacion = response.id_evaluacion;
          console.log("ID de evaluación:", id_evaluacion);

          // Además, puedes manejar el mensaje como lo necesites
          console.log("Mensaje:", response.mensaje);
        this.actualizarFechasEv(id_evaluacion);
      });

}


competencias(){

    // Filtras las habilidades por id_competencia
    const habilidades1 = this.elementos.filter(h => h.id_competencia ===1);
    const habilidades2 = this.elementos.filter(h => h.id_competencia ===2);
    const habilidades3 = this.elementos.filter(h => h.id_competencia ===3);

    this.habilidades1 = habilidades1
    this.habilidades2 = habilidades2
    this.habilidades3 = habilidades3


    // Ahora puedes hacer algo con las habilidades, por ejemplo, imprimir en la consola
  }

  actualizarFechasEv(idEvaluacion){
    // es para actualizar las fechas de evaluacion
    const idEvaluaciob= idEvaluacion
    const idBecario = this.idBecario
    const fechaEvaluacion = '' // falta conseguir la fecha de ev con select en tabla evaluaciones





  }

  atras(){
    this.location.back();
  }

}


