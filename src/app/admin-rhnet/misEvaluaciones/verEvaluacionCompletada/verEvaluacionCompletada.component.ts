import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as html2pdf from 'html2pdf.js';

@Component({

  templateUrl: './verEvaluacionCompletada.component.html',
  styleUrls: ['./verEvaluacionCompletada.component.scss'],
})
export class VerEvaluacionCompletadaComponent implements OnInit  {
  competencias: []; // son las competencias del check
  idBecario: number; // es el id de becario de la tabla becarios
  misDatos: any; // son mis datos de la tabla becario
  ideval1: number; // es el ideval1 de la tabla becarios
  checks: any; // seran los cheks
  elementosSeleccionados: number[] = []; // son los cheks que se seleccionan
  observaciones:[];
  numEvaluacion: number; // contendra el numero de evaluacion para saber que idval colocarle
  ideval2: number;
  tipo: String; // es el numero que le doy cuando, es para saber que evaluacion estoy dando click
  ideval3: number;
  ideval4: number;
  ideval5: number;
  becarioData: any;
  fechaEvaluacion:string;
  datosEvaluacion:any; // son los datos de cada evaluacion
  observacion: any;
  constructor (private rhService:RhnetService,  public route:ActivatedRoute, public location:Location ) {}
  idEvaluacion:any;
  generadoPDF= false

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const idBecario = params['id'];
      const evaluacion = params['evaluacion'];
      const tipo = params['tipo'];
      this.becarioData = params['becarios']; //todo checar por que esta en [object Object]
      // console.log(tipo)
      // console.log( "ev",evaluacion)
      // console.log( "id de becario", idBecario)
      this.idBecario = idBecario
      this.numEvaluacion = evaluacion
      this.tipo = tipo



      this.getBecario(tipo)
    });
    this.getCompetencias()

  }



  getCompetencias(){
    this.rhService.getCompetencias().subscribe((res)=>{
      this.competencias = res
      console.log( "competencias",res)


    })
  }

  getChecks(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval1).subscribe((res)=>{
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
      this.fechaEvaluacion = this.misDatos.fecha_de_eval1
    })

  }
  getChecks2(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval2).subscribe((res)=>{
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
      this.fechaEvaluacion = this.misDatos.fecha_de_eval2
    })
  }
  getChecks3(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval3).subscribe((res)=>{
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
    })

  }
  getChecks4(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval4).subscribe((res)=>{
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
    })

  }
  getChecks5(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval5).subscribe((res)=>{
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
    })

  }

  getBecario(tipo){
    this.rhService.getBecariosPorId(this.idBecario).subscribe((res)=>{
      this.misDatos = res
      this.ideval1 = this.misDatos.ideval1 //todo conseguir el ideval 2
      this.ideval2 = this.misDatos.ideval2
      this.ideval3 = this.misDatos.ideval3
      this.ideval4 = this.misDatos.ideval4
      this.ideval5 = this.misDatos.ideval5
      if(tipo === '1'){
      this.getChecks()
      }
      else if(tipo ==='2'){
        this.getChecks2();
      }else if(tipo === '3'){
        this.getChecks3();
      }else if(tipo ==='4'){
        this.getChecks4()
      }else if(tipo ==='5'){
        this.getChecks5()
      }

      this.getComentarios()

    })
  }

  getSugerencias(){
    this.rhService.getObservaciones(this.idBecario).subscribe((res)=>{
      console.log("ob",res)
      this.observaciones = res
      // crear un nueva api que solo obtenga una observacion
    })
  }

  getComentarios(){

    if(this.tipo==='1'){

      this.rhService.getEvaluacionId(this.ideval1).subscribe((res)=>{
        // console.log(res)
        this.datosEvaluacion = res
        this.observacion = this.datosEvaluacion.observa
      })

    }else if(this.tipo ==='2'){
      this.rhService.getEvaluacionId(this.ideval2).subscribe((res)=>{
        // console.log(res)
        this.datosEvaluacion = res
        this.observacion = this.datosEvaluacion.observa
      })

    }else if(this.tipo === '3'){
      this.rhService.getEvaluacionId(this.ideval3).subscribe((res)=>{
        // console.log(res)
        this.datosEvaluacion = res
        this.observacion = this.datosEvaluacion.observa
      })
    }else if(this.tipo === '4'){
      this.rhService.getEvaluacionId(this.ideval4).subscribe((res)=>{
        // console.log(res)
        this.datosEvaluacion = res
        this.observacion = this.datosEvaluacion.observa
      })

    }else if(this.tipo === '5'){
      this.rhService.getEvaluacionId(this.ideval5).subscribe((res)=>{
        // console.log(res)
        this.datosEvaluacion = res
        this.observacion = this.datosEvaluacion.observa
      })
    }


  }


  back(){
    this.location.back();
  }

  generarPDF() {
    this.generadoPDF = true;

    const element = document.getElementById('contenido');
    const options = {
      filename:   `Evaluacion # ${this.numEvaluacion}`,  // Cambia 'nombre_del_archivo' al nombre que desees
    };


    html2pdf(element,options).then(() => {
      this.generadoPDF = false;
    });
  }

  }






