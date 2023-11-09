import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

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
  updateAutorizar(id,fechaInicio,FechaFin){
    this.rhService.updateAutorizar(id).subscribe((res)=>{

      this.fechaInicio = fechaInicio
      this.fechaFin = FechaFin
      this.solicitudesColaborador()
      this.mensajeAutorizado(fechaInicio,FechaFin);

      this.snackBar.open('has Autorizado las Vacaciones', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
  }

  // es para rechazar la solicitud
  updateRechazar(id){

    this.rhService.updateRechazar(id).subscribe(()=>{
      this.solicitudesColaborador();

      this.snackBar.open('has denegado las vacaciones', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });

    })

  }

  mensajeAutorizado(fechaInicio,fechaFin1){

    const fecha = fechaInicio
    const fechaFin = fechaFin1
    const res = {
      destinatario: 'practicante.sistemas@dikeninternational.com',
      mensaje: 'Tus vacaciones de la fecha  ' + fecha + ' hasta el  ' + fechaFin + '  han sido autorizadas' ,
      titulo1: 'Vacaciones Autorizadas',
      subtitulo: 'Vacaciones'
    }
    console.log(fecha)

    this.rhService.mensajeDinamico(res.destinatario,res.mensaje,res.subtitulo,res.titulo1).subscribe(()=>{

    })
  }



}
