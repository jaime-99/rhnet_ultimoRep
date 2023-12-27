import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicioCompartidoService } from '../components/servicio-compartido.service';
import { Router } from '@angular/router';
import { Notificaciones } from './interfaces/notificaciones';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  idUsuario: any;
  messages=[];
  mensajes: any;

  ejemplo: string = "hola";


  constructor(private rhService:RhnetService, private mat:MatSnackBar, private servicio:ServicioCompartidoService, public router:Router) { }

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.idUsuario = usuarioAuth.data.Numero_Empleado

    this.messages = this.rhService.getNotificaciones(this.idUsuario)
    // console.log(this.messages)

    this.getNotificaciones();

  }


  marcarMensajeLeido(id){

    this.rhService.marcarComoLeido(id).subscribe((res)=>{

      this.getNotificaciones();


    })
  }

  getNotificaciones(){
    this.rhService.getNotificaciones(this.idUsuario).subscribe((res)=>{
      this.mensajes = res
      this.servicio.emitEvent();
    })
  }

  eliminarMensaje(id){

    this.rhService.eliminarMensaje(id).subscribe(()=>{

      this.getNotificaciones();
      this.mat.open('se ha eliminado el mensaje', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    })
  }

  irMensaje(id_tipo){
    // es para ir al mensaje al darle click y ver

    // let day : number = 4;

switch (id_tipo) {
    case 1:
        this.router.navigate(['rhnet/PASE'])
        break;
    case 2:
        this.router.navigate(['rhnet/Solicitar_Becario'])

        break;
    case 3:
      this.router.navigate(['/rhnet/CREAR_SOLICITUD'])
        break;
    case 4:
        break;
    case 5:
        break;
    case 6:
        break;
    default:
        break;
}

  }

}
