import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { resolve6 } from 'dns/promises';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {
  Empleado_id: number;
  Solicitudes: any[] = [];
  numEmpleado: number;
  usuario: any;
  infoEmpleado: any;
  fechaAlta: string;
  public año: any;
  anio: any
  correoJefe: any;
  informacionVacaciones:any
  diasUtilizados: number;

  constructor( public dialog: MatDialog, private rhService: RhnetService ) { }

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numEmpleado = usuarioAuth.data.Numero_Empleado,
    this.getDatosEmpleado()


    this.obtenerDatosSolicitud();


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: {correoJefe:this.correoJefe},
    });

    dialogRef.afterClosed().subscribe(result => {
      // const resultado = result;
      // console.log(resultado)

    });
}
  //obtener datos de la solicitud
  obtenerDatosSolicitud(){
    this.rhService.getSolicitudes(this.numEmpleado).subscribe((res)=>{
      this.Solicitudes= res
      // console.log(res)
    })
  }

  // cancelar la solicitud
  cancelarSolicitud(id){
    this.rhService.cancelarSolicitud(id).subscribe((res)=>{
      // console.log(res)
      this.obtenerDatosSolicitud();
    })
  }

  //obtener datos del empleado

  getDatosEmpleado (){
    this.rhService.getAllInfoEmpleados(this.numEmpleado).subscribe((res)=>{
      this.infoEmpleado = res
      this.fechaAlta = this.infoEmpleado.FECHA_ALTA
      this.correoJefe = this.infoEmpleado.correoDelJefe
      this.calcularAñosCumplidos()
      this.getInfoAdicional();
    })
  }


  calcularAñosCumplidos() {
    // Verifica si la fecha de alta está definida
    if (this.fechaAlta) {
      // Convierte la fecha de alta de formato yyyy-mm-dd a un objeto Date
      const fechaAlta = new Date(this.fechaAlta);

      // Obtiene la fecha actual
      const fechaActual = new Date();

      // Calcula la diferencia en milisegundos entre las dos fechas
      const diferenciaEnMilisegundos = fechaActual.getTime() - fechaAlta.getTime();

      // Convierte la diferencia en milisegundos a años
      const añosTranscurridos = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

      // Redondea el resultado a un número entero de años
      const añosRedondeados = Math.floor(añosTranscurridos);

      // Almacena el resultado en la variable 'año'
      this.anio = añosRedondeados;
      // console.log(this.año)
    }
  }


  // es para obtener informacion adicional de vacaciones
  getInfoAdicional(){

    this.rhService.getInfoVacaciones(this.numEmpleado).subscribe((res)=>{

      this.informacionVacaciones = res

      const diasDisponibles = this.informacionVacaciones.DiasDisponibles
      const diasUtilizados= 12 - diasDisponibles


      this.diasUtilizados = diasUtilizados;

    });
  }


}


