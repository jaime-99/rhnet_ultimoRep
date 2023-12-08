import { Component, OnInit, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent implements OnInit {
  generacionVacaciones: FormGroup;
  usuario: number;
  numUsuario: number; //2222
  correo: string;
  datosEmpleado:any
  usuarioIdEmpleado: any;
  numeroEmpleadoJefe: any;
  diasDiferencia: number;
  fechaHoy: string;
  fechaInicio: any;
  fechaFin: any;



  constructor(private fb:FormBuilder, private rhService:RhnetService, private mat:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<OpenDialogComponent>) {

  }

  ngOnInit(): void {




    this.fechaActual();

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado,
    this.correo = usuarioAuth.Correo
    // console.log(this.numUsuario)

    // generar el formulario de vacaciones
    this.verDatosEmpleado();

    this.generacionVacaciones = this.fb.group({
      // p_NumeroEmpleado:this.numUsuario || this.numEmpleadoColaborador, // Campo de usuario, requerido
      EmpleadoId: [],
      Numero_empleado: [this.numUsuario],
      Fecha_inicio: ['', Validators.compose([Validators.required])],
      FechaFin: ['', Validators.compose([Validators.required])],
      DiasSolicitados: [this.diasDiferencia],
      Periodo: ['2023', Validators.compose([Validators.required])], // es el año
      Id_Jefe: [],
      Id_autorizoRH: [1],
      IdEstatusSolicitudVaciones:1,
      Observaciones: [''],
      Observaciones_jefe: [''],
    });


  }




  //funcion para insertar la solicitud del usuario
  insertarSolicitud(values:Object){


    if(this.generacionVacaciones.valid){
      const{EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
        Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe} = this.generacionVacaciones.value

        this.rhService.insertarSolicitud(EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
          Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe).subscribe((res)=>{
          // console.log(res)
          this.mat.open('COMPLETADO', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          // this.enviarCorreo();
          //todo cerrar dialogo y llamar funcion otra vez para que se vean los datos reflejados
          this.dialogRef.close();

        })
    }else{

      this.mat.open('TE FALTAN DATOS', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }


  //ver los datos del empleado que inicio sesion
  verDatosEmpleado(){
    this.rhService.getAllInfoEmpleados(this.numUsuario).subscribe((res)=>{
      this.datosEmpleado = res
      this.usuarioIdEmpleado = this.datosEmpleado.id
      console.log(this.usuarioIdEmpleado);
      this.numeroEmpleadoJefe = this.datosEmpleado.NUMERO_EMPLEADO_JEFE

      this.generacionVacaciones.patchValue({
        EmpleadoId: this.usuarioIdEmpleado
      });
      this.generacionVacaciones.patchValue({
        Id_Jefe: this.numeroEmpleadoJefe
      });
    })
  }

  calcularDiasSolicitados() {
    const fechaInicio = new Date(this.generacionVacaciones.value.Fecha_inicio);
    const fechaFin = new Date(this.generacionVacaciones.value.FechaFin);

    this.fechaInicio = this.generacionVacaciones.value.Fecha_inicio;
    this.fechaFin = this.generacionVacaciones.value.FechaFiin;
    // Calculamos la diferencia en milisegundos y la convertimos a días


    const diferenciaEnTiempo = fechaFin.getTime() - fechaInicio.getTime();
    const diasDiferencia = Math.ceil(diferenciaEnTiempo / (1000 * 3600 * 24));

    // console.log(diasDiferencia)

    this.diasDiferencia = diasDiferencia

    // Asignamos el valor calculado a DiasSolicitados
    this.generacionVacaciones.patchValue({
      DiasSolicitados: diasDiferencia
    });
    // console.log(this.generacionVacaciones.value);
  }

  // es para enviar correo a tu jefe cuando envies la solicitud
  enviarCorreo(){

    const fechaInicio= this.generacionVacaciones.get('Fecha_inicio').value;
    const fechaFin = this.generacionVacaciones.get('FechaFin').value;
    const dias = this.generacionVacaciones.get('DiasSolicitados').value;


    const datosCorreo = {
      fecha: this.fechaHoy,
      fechaInicio:fechaInicio,
      fechaFin : fechaFin,
      dias :dias,
      numeroEmpelado: '222',
      nombre: 'jaime',
      // correo:'practicante.sistemas@dikeninternational.com'
      correo:this.data.correoJefe
    };

    this.rhService.sendVacaciones(datosCorreo.fecha,datosCorreo.fechaInicio,datosCorreo.fechaFin,datosCorreo.dias,datosCorreo.numeroEmpelado,
      datosCorreo.nombre,datosCorreo.correo).subscribe((res)=>{
      // console.log(res)
    })
  }

  fechaActual(){
    const fechaActual = new Date();

// Puedes obtener el año, mes y día por separado
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1 para obtener el mes real.
    const day = fechaActual.getDate();

    // También puedes obtener la fecha completa en formato de cadena
    const fechaFormateada = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;


    this.fechaHoy = fechaFormateada
  }









}
