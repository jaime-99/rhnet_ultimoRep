import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  idUsuario: any;
  messages=[];
  mensajes: any;

  constructor(private rhService:RhnetService) { }

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
    })
  }

}
