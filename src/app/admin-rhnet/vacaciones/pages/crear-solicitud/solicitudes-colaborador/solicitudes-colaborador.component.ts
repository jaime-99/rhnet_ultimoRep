import { Component, OnInit } from '@angular/core';
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
  updateAutorizar(id){
    this.rhService.updateAutorizar(id).subscribe((res)=>{

      this.solicitudesColaborador()
      this.mensajeAutorizado();

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

  mensajeAutorizado(){

    const fecha = '17/12/99'
    const fechaFin = '12/12/23'
    const res = {
      destinatario: 'practicante.sistemas@dikeninternational.com',
      mensaje: 'Tus vacaciones del día ' + fecha + ' hasta el día ' + fechaFin + 'han sido autorizadas' ,
      titulo1: 'Vacaciones Autorizadas',
      subtitulo: 'Vacaciones'
    }

    this.rhService.mensajeDinamico(res.destinatario,res.mensaje,res.subtitulo,res.titulo1).subscribe(()=>{

    })
  }



}
