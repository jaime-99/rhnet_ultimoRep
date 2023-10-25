import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { ServicioCompartidoService } from 'src/app/admin-rhnet/components/servicio-compartido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  correo: string; // colocar en otra clase particulas de interfaces
  fecha: string;
  tipo: number;
  hora:string;
  horaEntrada:string;
  horaSalida:string;
  observaciones:string;

}





@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent implements OnInit {
  usuario: any;
  numUsuario: any;
  empresa: any;
  @Input() numeroEmpleado:number

  generacionPase: FormGroup;

  //esta en estatico los tipo de pases
  public tipos = [
    { id:1, nombre: 'entrada y salida' },
    { id:2, nombre: 'entrada' },
    { id:3, nombre: 'salida' }
  ];
  numeroEmpleadoJefe: number;
  correo: any;
  correoJefe: string;

  constructor(private fb:FormBuilder,public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OpenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private rhService:RhnetService, public weService:ServicioCompartidoService
  ) {

  }

  onNoClick(values:Object): void {

    // console.log(this.generacionPase.value); // Muestra los datos del formulario en la consola

    if(this.generacionPase.valid){
      const {p_NumeroEmpleado,p_Fecha,p_Tipo,p_Motivo,p_Autorizado,p_Empresa,p_NumeroEmpleadoJefe,p_Hora,
        p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida} = this.generacionPase.value
      this.rhService.InsertarPase(p_NumeroEmpleado,p_Fecha,p_Tipo,p_Motivo,p_Autorizado,p_Empresa,p_NumeroEmpleadoJefe,
        p_Hora,p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida).subscribe((res)=>{
        })

        this.dialogRef.close();
        this.snackBar.open('has creado una generacion de pase', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.sendMailToBoss();
        this.insertarNotificacion();


    }else{

      // console.log("te faltan datos que llenar")
      this.snackBar.open('Te faltan datos que llenar', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    }

    // this.enviarDatos();

    // console.log(this.data.tipo)

  }


  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado
    this.empresa = usuarioAuth.data.Empresa,
    this.correo = usuarioAuth.Correo
    this.numeroEmpleadoJefe = this.weService.miVariable // de aqui saco el jefe
    this.correoJefe = this.weService.correoJefe


    this.generacionPase = this.fb.group({
      p_NumeroEmpleado:this.numUsuario , // Campo de usuario, requerido
      p_Fecha: ['', Validators.compose([Validators.required])], // Campo de contraseña, requerido
      p_Tipo: ['', Validators.compose([Validators.required])], // Campo de contraseña, requerido
      p_Motivo: ['', Validators.compose([Validators.required])],
      p_Autorizado: 0, // Campo de contraseña, requerido
      p_Empresa: this.empresa,
      p_NumeroEmpleadoJefe: this.numeroEmpleadoJefe,
      p_Hora: ['', Validators.compose([Validators.required])],
      p_AutorizadoSalida: 0,
      p_HoraEntrada: [ null],
      p_HoraSalida: [ null],

    });


    //conseguir la fecha
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses son base 0, por lo que sumamos 1
    const dia = fechaActual.getDate();

    const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    this.data.fecha = fechaFormateada

    //conseguir la hora
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    const amPm = horas >= 12 ? 'p.m.' : 'a.m.';

// Convertir las horas al formato de 12 horas
    const horas12 = horas > 12 ? (horas - 12) : horas;

// Formatear la hora como una cadena (por ejemplo, "02:20 p.m.")
  const horaFormateada = `${horas12.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;


  this.data.hora = horaFormateada


}



  // enviarDatos(){

  //   let data = {
  //   p_NumeroEmpleado: this.numUsuario,
  //   p_Fecha:this.data.fecha,
  //   p_Tipo:this.data.tipo,
  //   p_Motivo:this.data.observaciones,
  //   p_Autorizado : 0, // contesta el jefe
  //   p_Empresa: this.empresa,
  //   p_NumeroEmpleadoJefe: this.numeroEmpleadoJefe,
  //   p_Hora: this.data.hora,
  //   p_AutorizadoSalida: 0, // contesta el jefe
  //   p_HoraEntrada: this.data.horaEntrada || null, //de donde agarro este dato
  //   p_HoraSalida: this.data.horaSalida || null // de donde agarro este dato

  //   }
  //   this.rhService.InsertarPase(data.p_NumeroEmpleado,data.p_Fecha,data.p_Tipo,data.p_Motivo,data.p_Autorizado,
  //     data.p_Empresa,data.p_NumeroEmpleadoJefe,data.p_Hora,data.p_AutorizadoSalida,data.p_HoraEntrada,data.p_HoraSalida).subscribe((res)=>{
  //     console.log(res)
  //   })

  //   // this.sendMailToBoss();


  // }


  sendMailToBoss(){

    const tipo = this.generacionPase.get('p_Tipo').value;


    const data = {
      // correo:'practicante.sistemas@dikeninternational.com', // al correo que se le mandara
      fecha: this.data.fecha,
      numeroEmpleado: this.numUsuario,
      motivo: this.data.observaciones,
      nombre: this.usuario,
      correo:'practicante.sistemas@dikeninternational.com',
      // correo:this.correoJefe,
      tipoDePase: ''
    }

    if(tipo===1){
      data.tipoDePase="entrada y salida "
    }
    if(tipo===2){
      data.tipoDePase="Entrada"
    }
    if(tipo===3){
      data.tipoDePase="Salida"
    }

    this.rhService.sendToBoss(data.fecha,data.numeroEmpleado,data.motivo,data.nombre,data.correo,data.tipoDePase).subscribe((res)=>{
      // console.log(res)
    })

  }

  volver(){
    //es solo una alternativa para volver sin datos
    this.dialogRef.close();
  }

  // es para insertar una notificacion al jefe cada vez que autorize un mensaje
  insertarNotificacion(){

    const notificaciones={
      p_usuario_id:this.numeroEmpleadoJefe,
      p_mensaje:'se le ha enviado un pase para autorizar',
      p_tipo:'Incidencias'
    }

    this.rhService.insertarNotificacion(notificaciones.p_usuario_id,notificaciones.p_mensaje,notificaciones.p_tipo).subscribe((res)=>{

      if(res===true){

      }
    })


  }




  //es solo para commit

}
