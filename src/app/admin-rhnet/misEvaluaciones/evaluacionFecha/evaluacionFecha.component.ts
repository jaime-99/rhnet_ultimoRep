import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion-fecha',
  templateUrl: './evaluacionFecha.component.html',
  styleUrls: ['./evaluacionFecha.component.scss'],
})
export class EvaluacionFechaComponent  implements OnInit {
  becarios: any;
  becarioId: any;

  constructor ( private rhnetService:RhnetService, private route: ActivatedRoute,private router:Router) {}



  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const becarioId = params['id'];
      this.becarioId = becarioId
      // console.log('ID del Becario:', becarioId);

      // Realiza las acciones necesarias con el parámetro
    });

    this.getBecarios();



  }


  getBecarios(){
    this.rhnetService.getBecariosPorId(this.becarioId).subscribe((res)=>{
      this.becarios = res
      console.log(res)
    })
  }


  irEvaluar(evaluacion){

    this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluarBecario', {evaluacion:evaluacion}]);


  }


 }
