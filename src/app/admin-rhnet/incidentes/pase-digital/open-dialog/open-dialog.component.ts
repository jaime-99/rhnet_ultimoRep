import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { ServicioCompartidoService } from 'src/app/admin-rhnet/components/servicio-compartido.service';

export interface DialogData { // colocar en otra clase particulas de interfaces
  fecha: string;
  tipo: number;
  hora:string;
  horaEntrada:string;
  horaSalida:string;
  observaciones:string;

}

export interface tipoEntrada {

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

  public tipos = [
    { id:1, nombre: 'entrada' },
    { id:2, nombre: 'salida' },
    { id:3, nombre: 'entrada y salida' }
  ];
  numeroEmpleadoJefe: number;

  constructor(
    private dialogRef: MatDialogRef<OpenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private rhService:RhnetService, public weService:ServicioCompartidoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();

    this.enviarDatos();
    console.log(this.data.tipo)

  }


  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado
    this.empresa = usuarioAuth.data.Empresa,
    this.numeroEmpleadoJefe = this.weService.miVariable




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



  enviarDatos(){

    let data = {
    p_NumeroEmpleado: this.numUsuario,
    p_Fecha:this.data.fecha,
    p_Tipo:this.data.tipo,
    p_Motivo:this.data.observaciones,
    p_Autorizado : 0, // contesta el jefe
    p_Empresa: this.empresa,
    p_NumeroEmpleadoJefe: this.numeroEmpleadoJefe,
    p_Hora: this.data.hora,
    p_AutorizadoSalida: 0, // contesta el jefe
    p_HoraEntrada: this.data.horaEntrada || null, //de donde agarro este dato
    p_HoraSalida: this.data.horaSalida || null // de donde agarro este dato

    }
    this.rhService.InsertarPase(data.p_NumeroEmpleado,data.p_Fecha,data.p_Tipo,data.p_Motivo,data.p_Autorizado,
      data.p_Empresa,data.p_NumeroEmpleadoJefe,data.p_Hora,data.p_AutorizadoSalida,data.p_HoraEntrada,data.p_HoraSalida).subscribe((res)=>{
      console.log(res)
    })

    // this.sendMailToBoss();


  }


  sendMailToBoss(){

    const data = {
      // correo:'practicante.sistemas@dikeninternational.com', // al correo que se le mandara
      fecha: this.data.fecha,
      numeroEmpleado: this.numUsuario,
      motivo: this.data.observaciones,
      nombre: this.usuario,
    }

    this.rhService.sendToBoss(data.fecha,data.numeroEmpleado,data.motivo,data.nombre).subscribe((res)=>{
      console.log(res)
    })


  }





}
