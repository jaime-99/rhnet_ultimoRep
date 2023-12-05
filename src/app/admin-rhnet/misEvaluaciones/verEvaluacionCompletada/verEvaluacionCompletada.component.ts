import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor (private rhService:RhnetService,  public route:ActivatedRoute) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const idBecario = params['id'];
      // console.log( "id de becario", idBecario)
      this.idBecario = idBecario
    });
    this.getCompetencias()
    this.getBecario()

  }



  getCompetencias(){
    this.rhService.getCompetencias().subscribe((res)=>{
      this.competencias = res
      console.log(res)


    })
  }

  getChecks(){
    //obtener el id del check
    this.rhService.getChecks(this.ideval1).subscribe((res)=>{
      // console.log(res)
      this.checks = res

      const elementosSeleccionados = this.checks
      .map(habilidad => habilidad.id_elem);

      this.elementosSeleccionados = elementosSeleccionados
    })

  }

  getBecario(){
    this.rhService.getBecariosPorId(this.idBecario).subscribe((res)=>{
      this.misDatos = res
      this.ideval1 = this.misDatos.ideval1
      this.getChecks()



    })
  }






 }
