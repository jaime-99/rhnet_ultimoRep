import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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



  constructor(private fb:FormBuilder, private rhService:RhnetService, private mat:MatSnackBar) {


    this.generacionVacaciones = this.fb.group({
      // p_NumeroEmpleado:this.numUsuario || this.numEmpleadoColaborador, // Campo de usuario, requerido
      EmpleadoId: [222], // Campo de contraseña, requerido
      Numero_empleado: [2222], // Campo de contraseña, requerido
      Fecha_inicio: ['', Validators.compose([Validators.required])],
      FechaFin: ['', Validators.compose([Validators.required])],
      DiasSolicitados: [''],
      Periodo: ['', Validators.compose([Validators.required])],
      Id_Jefe: [222],
      Id_autorizoRH: [1],
      IdEstatusSolicitudVaciones:1,
      Observaciones: ['ejemplo desde visualstudio'],
      Observaciones_jefe: ['ejemplo desde visual studio'],
    });

  }

  ngOnInit(): void {


    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado,
    this.correo = usuarioAuth.Correo
    // console.log(this.numUsuario)

    // generar el formulario de vacaciones



    this.verDatosEmpleado();
    this.calcularDiasSolicitados()

  }




  //funcion para insertar la solicitud del usuario
  insertarSolicitud(values:Object){


    if(this.generacionVacaciones.valid){
      const{EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
        Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe} = this.generacionVacaciones.value

        this.rhService.insertarSolicitud(EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
          Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe).subscribe((res)=>{
          console.log(res)
          this.mat.open('COMPLETADO', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

        })
        this.calcularDiasSolicitados()
    }else{

      this.mat.open('TE FALTAN DATOS', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });


    }
  }


  //ver los datos del empleado que inicio sesion
  verDatosEmpleado(){
    this.rhService.getAllInfoEmpleados(this.numUsuario).subscribe((res)=>{
      this.datosEmpleado = res
      this.usuarioIdEmpleado = this.datosEmpleado.id
      this.numeroEmpleadoJefe = this.datosEmpleado.NUMERO_EMPLEADO_JEFE
    })

  }

  calcularDiasSolicitados() {
    const fechaInicio = new Date(this.generacionVacaciones.value.Fecha_inicio);
    const fechaFin = new Date(this.generacionVacaciones.value.FechaFin);


    // Calculamos la diferencia en milisegundos y la convertimos a días
    const diferenciaEnTiempo = fechaFin.getTime() - fechaInicio.getTime();
    const diasDiferencia = Math.ceil(diferenciaEnTiempo / (1000 * 3600 * 24));

    console.log(diasDiferencia)

    this.diasDiferencia = diasDiferencia

    // Asignamos el valor calculado a DiasSolicitados
    this.generacionVacaciones.patchValue({
      DiasSolicitados: diasDiferencia
    });
  }






}
