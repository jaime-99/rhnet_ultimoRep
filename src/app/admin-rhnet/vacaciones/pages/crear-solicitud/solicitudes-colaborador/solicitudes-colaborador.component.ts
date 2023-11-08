import { Component, OnInit } from '@angular/core';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-solicitudes-colaborador',
  templateUrl: './solicitudes-colaborador.component.html',
  styleUrls: ['./solicitudes-colaborador.component.scss']
})
export class SolicitudesColaboradorComponent implements OnInit {
  solicitudesCol: any;
  numEmpleado: any;

  constructor(private rhService: RhnetService) { }

  ngOnInit(): void {


    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.numEmpleado = usuarioAuth.data.Numero_Empleado
    console.log( "numero de empleado desde colaborador ",this.numEmpleado)
    this.solicitudesColaborador();


  }

  // ver las colictudes que tienes como jefe
  solicitudesColaborador(){
    this.rhService.getSolicitudesColaborador(this.numEmpleado).subscribe((res)=>{
      this.solicitudesCol = res
    })
  }

  // es para autorizar un solicitud de vacaciones en 2
  updateAutorizar(id){
    this.rhService.updateAutorizar(id).subscribe((res)=>{

      this.solicitudesColaborador()

      })
  }

  updateRechazar(){

  }



}
