import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-evaluaciones',
  templateUrl: './misEvaluaciones.component.html',
  styleUrls: ['./misEvaluaciones.component.scss'],
})
export class MisEvaluacionesComponent implements OnInit {
  numEmpleado: any;
  numUsuario: any;
  Misbecarios: any;


  constructor (private rhnetService:RhnetService,private router:Router){}



  ngOnInit(): void {


    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numEmpleado = usuarioAuth.data.Numero_Empleado

    this.obtenerIdUsuario()



  }


  obtenerIdUsuario(){
    this.rhnetService.getAllInfoEmpleados(this.numEmpleado).subscribe((res)=>{
      // console.log(res)
      this.numUsuario = res.idUsuario
      // console.log("es mi num de usuario",this.numUsuario)
      this.getBecarios();
    })
  }

  getBecarios(){

    this.rhnetService.getBecarios(this.numUsuario).subscribe((res)=>{
      // console.log("mis becarios",res)
      this.Misbecarios = res
    })
  }


  irEvaluar(id){
    // es para ir a la evaluacion y obtener el num de evaluacion , para posterior insertar le idEval

    this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluacionFecha', {id:id}]);




  }




}
