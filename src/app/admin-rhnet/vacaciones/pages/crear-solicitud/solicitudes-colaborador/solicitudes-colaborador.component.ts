import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-solicitudes-colaborador',
  templateUrl: './solicitudes-colaborador.component.html',
  styleUrls: ['./solicitudes-colaborador.component.scss']
})
export class SolicitudesColaboradorComponent implements OnInit {
  solicitudesCol: any;
  numEmpleado: any;

  @Input() fecha:any
  fechaInicio: any;
  fechaFin: any;


  constructor(private rhService: RhnetService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.numEmpleado = usuarioAuth.data.Numero_Empleado
    this.solicitudesColaborador();


  }

  // ver las colictudes que tienes como jefe
  solicitudesColaborador(){
    this.rhService.getSolicitudesColaborador(this.numEmpleado).subscribe((res)=>{
      this.solicitudesCol = res
    })
  }

  // es para autorizar un solicitud de vacaciones en 2
  updateAutorizar(id,fechaInicio,FechaFin,email){
    this.rhService.updateAutorizar(id).subscribe((res)=>{

      const fechaIncioF = formatDate(fechaInicio, 'dd/MM/yyyy', 'en-US');
      const fechaFinF = formatDate(FechaFin, 'dd/MM/yyyy', 'en-US');



      this.solicitudesColaborador()
      this.mensajeAutorizado(fechaIncioF,fechaFinF,email);

      this.snackBar.open('has Autorizado las Vacaciones', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
  }

  // es para rechazar la solicitud
  updateRechazar(id,fechaInicio,FechaFin,email){

    this.rhService.updateRechazar(id).subscribe(()=>{
      this.solicitudesColaborador();

      const fechaIncioF = formatDate(fechaInicio, 'dd/MM/yyyy', 'en-US');
      const fechaFinF = formatDate(FechaFin, 'dd/MM/yyyy', 'en-US');

      this.snackBar.open('has denegado las vacaciones', '×', { panelClass: 'alert', verticalPosition: 'top', duration: 3000 });
      this.mensajeRechazado(fechaIncioF,fechaFinF,email)

    })
  }

  mensajeAutorizado(fechaInicio,fechaFin1,email){

    const fecha = fechaInicio
    const fechaFin = fechaFin1
    const res = {
      destinatario: email,
      mensaje: 'Tus vacaciones de la fecha  ' + fecha + ' hasta el  ' + fechaFin + '  han sido autorizadas' ,
      titulo1: 'Vacaciones Autorizadas',
      subtitulo: 'Vacaciones'
    }
    this.rhService.mensajeDinamico(res.destinatario,res.mensaje,res.subtitulo,res.titulo1).subscribe(()=>{

    })
  }

  mensajeRechazado(fechaInicio,FechaFin,email){

    const fecha = fechaInicio
    const fechaFin = FechaFin
    const res = {
      destinatario : email,
      mensaje: 'Tus vacaciones de la fecha  ' + fecha + ' hasta el  ' + fechaFin + '  han sido RECHAZADAS' ,
      titulo1: 'Vacaciones Rechazadas',
      subtitulo: 'Vacaciones',

    }

    this.rhService.mensajeDinamico(res.destinatario,res.mensaje,res.subtitulo,res.titulo1).subscribe(()=>{



    })

  }



}
