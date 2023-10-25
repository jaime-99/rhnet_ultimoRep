import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MessagesService } from './messages.service';
import { RhnetService } from '../../rhnet.service';
import { ServicioCompartidoService } from '../servicio-compartido.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MessagesService ]
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab:number=1;
  public messages:any;
  public files:Array<Object>;
  public meetings:Array<Object>;
  numUsuario: any;
  infoMensajes: any;
  mensajes:Array<Object>;
  cantidadMensajesNoLeidos: number;
  arrayMensaje: any;
  mensajesLeidos: any;
  mensajesNoLeidos: any;
  mensajesNoLeidos2: any;
  constructor(private messagesService:MessagesService,private rhService:RhnetService, private servicio:ServicioCompartidoService) {
    // this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
  }

  ngOnInit() {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numUsuario = usuarioAuth.data.Numero_Empleado

    this.getmessages();

    this.servicio.getEvent().subscribe(()=>{

      this.getmessages();
    });

  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  onMouseLeave(){
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

  getmessages(){
    this.rhService.getNotificaciones(this.numUsuario).subscribe((res)=>{
      this.messages = res
      // console.log(this.messages)
      // this.messages = this.infoMensajes.mensaje

    const mensajesNoLeidos = this.messages.filter((mensaje) => !mensaje.leida);
    this.cantidadMensajesNoLeidos = mensajesNoLeidos.length;

    this.messages.forEach(mensaje => {
      this.arrayMensaje = mensaje
      console.log( "son todos los mensajes" , " " ,mensaje.mensaje)
    });

    const mensajesLeidos = this.messages.filter((mensaje) => mensaje.leida==1);
    this.mensajesLeidos = mensajesLeidos


    const mensajes = this.messages.filter((mensaje) => mensaje.leida ===0);
    this.mensajesNoLeidos2 = mensajes;

    })


  }

  ejemplo(ejemplo){
    console.log(ejemplo)
  }

}
