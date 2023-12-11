import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluacion-fecha',
  templateUrl: './evaluacionFecha.component.html',
  styleUrls: ['./evaluacionFecha.component.scss'],
})
export class EvaluacionFechaComponent  implements OnInit {
  becarios: any;
  becarioId: any;

  fecha1 = false;
  fecha2 = false;
  fecha3 = false;
  fecha4 = false;
  fecha5 = false;

  constructor ( private rhnetService:RhnetService, private route: ActivatedRoute,private router:Router
    , public snackBar: MatSnackBar, public location:Location) {}



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
      // console.log(res)
    })
  }


  irEvaluar(evaluacion){

    // if(evaluacion ===1){
    //   this.fecha1 = true;
    // }else if(evaluacion ===2){
    //   this.fecha2 = true;
    // }else if(evaluacion== 3){
    //   this.fecha3 = true;
    // }else if(evaluacion ==4){
    //   this.fecha4 = true;
    // }else if(evaluacion ==5){
    //   this.fecha5 = true;
    // }

    switch (evaluacion) {
      case 1:
        const fechaActual:Date = new Date();
        const evalFecha:Date= new Date(this.becarios.eval_fecha1);

        const diferenciaEnMilisegundos: number = evalFecha.getTime() - fechaActual.getTime();
        const diferenciaEnDias: number = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

        if (diferenciaEnDias <= 5) {
      this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluarBecario', {evaluacion:evaluacion,idBecario:this.becarioId}]);
      // console.log('¡Faltan menos de 5 días para la evaluación!');
      this.fecha2 = true

      }else{
        const dia = evalFecha.getDate();
        const mes = evalFecha.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
        const ano = evalFecha.getFullYear();

        const fechaFormateada = `${dia}/${mes}/${ano}`;
        this.snackBar.open('El dia para evaluar es el : '+ fechaFormateada, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        this.fecha1 = true;

      }

          break;
      case 2:
        const fechaActual2:Date = new Date();
        const evalFecha2:Date= new Date(this.becarios.eval_fecha2);

    const diferenciaEnMilisegundos2: number = evalFecha2.getTime() - fechaActual2.getTime();
    const diferenciaEnDias2: number = Math.floor(diferenciaEnMilisegundos2 / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias2 <= 5) {
      // console.log('faltan 5 dias')
      this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluarBecario', {evaluacion:evaluacion,idBecario:this.becarioId}]);
      }else{
        // console.log("faltan mas dias")
        const dia2 = evalFecha2.getDate();
        const mes2 = evalFecha2.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
        const ano2 = evalFecha2.getFullYear();

        const fechaFormateada2 = `${dia2}/${mes2}/${ano2}`;
        this.snackBar.open('El dia para evaluar es el : '+ fechaFormateada2, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
          break;
      case 3:
        const fechaActual3:Date = new Date();
        const evalFecha3:Date= new Date(this.becarios.eval_fecha3);
        // console.log(evalFecha3)

    const diferenciaEnMilisegundos3: number = evalFecha3.getTime() - fechaActual3.getTime();
    const diferenciaEnDias3: number = Math.floor(diferenciaEnMilisegundos3 / (1000 * 60 * 60 * 24));

    // console.log(diferenciaEnDias3)

    if (diferenciaEnDias3 <= 5) {
      // console.log('¡Faltan menos de 5 días para la evaluación!');
      this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluarBecario', {evaluacion:evaluacion,idBecario:this.becarioId}]);

      }else{
        // console.log("aun faltan mas dias")
        const dia3 = evalFecha3.getDate();
        const mes3 = evalFecha3.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
        const ano3 = evalFecha3.getFullYear();

        const fechaFormateada3 = `${dia3}/${mes3}/${ano3}`;
        this.snackBar.open('El dia para la tercera evaluacion  es el : '+ fechaFormateada3, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
          break;
      case 4:
        const fechaActual4:Date = new Date();
    const evalFecha4:Date= new Date(this.becarios.eval_fecha4);

    const diferenciaEnMilisegundos4: number = evalFecha4.getTime() - fechaActual4.getTime();
    const diferenciaEnDias4: number = Math.floor(diferenciaEnMilisegundos4 / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias4 <= 5) {
      // console.log('¡Faltan menos de 5 días para la evaluación!');
      this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluarBecario', {evaluacion:evaluacion,idBecario:this.becarioId}]);

      }else{
        // console.log("aun faltan mas dias")
        const dia4 = evalFecha4.getDate();
        const mes4 = evalFecha4.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
        const ano4 = evalFecha4.getFullYear();

        const fechaFormateada4 = `${dia4}/${mes4}/${ano4}`;
        this.snackBar.open('El dia para evaluar es el : '+ fechaFormateada4, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
          break;
          case 5:
          const fechaActual5:Date = new Date();
    const evalFecha5:Date= new Date(this.becarios.eval_fecha5);

    const diferenciaEnMilisegundos5: number = evalFecha5.getTime() - fechaActual5.getTime();
    const diferenciaEnDias5: number = Math.floor(diferenciaEnMilisegundos5 / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias5 <= 5) {
      // console.log('¡Faltan menos de 5 días para la evaluación!');

      }else{

        const dia5 = evalFecha2.getDate();
        const mes5 = evalFecha2.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
        const ano5 = evalFecha2.getFullYear();

        const fechaFormateada5 = `${dia5}/${mes5}/${ano5}`;
        this.snackBar.open('El dia para evaluar es el : '+ fechaFormateada5, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
      break;

      default:
  }


    // const fechaActual:Date = new Date();
    // const evalFecha:Date= new Date(this.becarios.eval_fecha1);

    // const diferenciaEnMilisegundos: number = evalFecha.getTime() - fechaActual.getTime();
    // const diferenciaEnDias: number = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // if (diferenciaEnDias <= 5) {
    //   console.log('¡Faltan menos de 5 días para la evaluación!');
    //   }else{
    //     console.log("aun faltan mas dias")

    //   }


    // if (evalFecha > fechaActual) {
    //   console.log("la fecha es mayor")

    // } else {

    //     console.log('La fecha eval_fecha1 ya ha pasado o es hoy.');
    // }



  }

  irAVerEvaluacion(evaluacion,tipo){

    this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluacionDetalle', {id:this.becarioId,evaluacion:evaluacion,tipo:tipo,becarios:this.becarios}]);

  }

  back(){
    this.location.back()

  }

 }
