import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../../rhnet.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { useAnimation } from '@angular/animations';
import { ServicioCompartidoService } from '../../components/servicio-compartido.service';
import { Observable } from 'rxjs';
import { array } from '@amcharts/amcharts5';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pase-digital',
  templateUrl: './pase-digital.component.html',
  styleUrls: ['./pase-digital.component.scss']
})
export class PaseDigitalComponent implements OnInit {
  pase: FormGroup;
  usuario = ''
  name: any;
  animal: any;
  numUsuario: any;
  usuarioJefe:any;
  datosUsuario: any;
  fecha_alta: any;
  id_jefe: any;
  numeroEmpleadoJefe: number;

  esColaborador =false;

  // pases = []

  pases$: Observable<any[]>; // Declarar un observable
  // pasesJefe: Object;
  pasesJefe$:Observable<any[]>;

  nombreJefe: any;
  NombreCompleto: any;
  nombreDelJefe: any;


  datosPases = {
    nombreDelJefe : '',
    idDelJefe : '',
    nombreCompleto: ''

  }
  pasesJefe= [];
  correo: any;
  correoJefe: any;
  idDelEmpleadoDelJefe: any;
  nombreDelEmpleado: string;
  fechaDelPase: any;
  nombreDelJefe2: any;
  tipoDePase: any;
  numeroDelEmpleado2: any;
  botonesAutorizados: boolean = false;
  correoDelEmpelado: any;
  alerta: boolean = false;

  pantalla = false;


  constructor(private fb:FormBuilder, public rhService:RhnetService,public dialog: MatDialog,private weService:ServicioCompartidoService,
    private mat:MatSnackBar) {

    this.pase = this.fb.group({
      username: ['', Validators.required], // Campo de usuario, requerido
      password: ['', Validators.required], // Campo de contraseña, requerido
    });
  }


  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado,
    this.correo = usuarioAuth.Correo
    this.rhService.getAllInfoEmpleados(this.numUsuario).subscribe((res:any)=>{
      console.log(res)
      this.datosUsuario = res
      this.id_jefe = this.datosUsuario.NUMERO_EMPLEADO_JEFE
      // console.log(this.id_jefe)
      this.fecha_alta = this.datosUsuario.FECHA_ALTA
      this.NombreCompleto = this.datosUsuario.nombre
      this.getNameBoss();
      this.getPases();
      this.getPasesJefe();
    })

  }

  //obtener los datos del jefe de un usuario
  getNameBoss(){
    // this.rhService.getUsuariosPorId1(this.id_jefe).subscribe((res:any)=>{
    //   // console.log(res)
    //   const usuarioJefe = res
    //   this.usuarioJefe = usuarioJefe.usuario
    //   this.numeroEmpleadoJefe = usuarioJefe.numero_empleado
    // })
    this.rhService.getAllInfoEmpleados(this.id_jefe).subscribe((res:any)=>{
      // console.log(this.id_jefe)
      // console.log("informacion del jefe", res)
         const usuarioJefe = res
      this.nombreJefe = usuarioJefe.nombre
      this.correoJefe = usuarioJefe.EMAIL
      // console.log("correo del jefe",this.correoJefe);


      // this.numeroEmpleadoJefe = usuarioJefe.numero_empleado

    })
  }

  onSubmit(){
    // let data = {

    // }
    // this.rhService.InsertarPase(data).subscribe((res)=>{
    //   console.log(res)
    // })
  }


  //es para enviar los datos
  openDialog(colaborador): void {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: {p_NumeroEmpleado: this.numUsuario, p_Fecha: '', p_Tipo:'', p_Motivo:'',p_Autorizado: '', p_Empresa:'',
      p_NumeroEmpleadoJefe:'',p_Hora:'', p_AutorizadoSalida:'', p_HoraEntrada:'',p_HoraSalida:'',correo:this.correo,colaborador},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('el dialogo se ha cerrado');
      const resultado = result;
      console.log(resultado)

      if (result !== undefined && result !== null) {
        // Llamar a getPases solo si result es válido
        this.getPases();
        this.pantalla = true;
      }



      // this.getPases();

    });

    this.weService.setVariable(this.id_jefe,this.correoJefe);
  }


  getPases(){
    // this.rhService.getPases().subscribe((data:any)=>{
    //   // console.log(data)
    //   this.pases$ = data;
    //   console.log(this.pases$)
    // })
    const usuarioId = {
      numUsuario :this.numUsuario
    }


    this.pases$ = this.rhService.getPases(usuarioId.numUsuario); // Asignar el observable

    // this.getPasesJefe();
  }

  //es para obtener los pases que debe autorizar
  getPasesJefe(){

    //todo crear un bucle para que me genere todos los datos del pase del jefe

    this.rhService.getPasesJefe(this.numUsuario).subscribe((res)=>{
      this.pasesJefe = res

      if(this.pasesJefe.length===0){
        this.alerta = true
      }


    this.pasesJefe.forEach(mensaje => {
      this.idDelEmpleadoDelJefe = mensaje.NumeroEmpleado,
      this.nombreDelEmpleado = mensaje.TuNombre,
      this.fechaDelPase = mensaje.Fecha,
      this.nombreDelJefe2 = mensaje.NombreDelJefe
      this.tipoDePase = mensaje.tipoDeEntrada
      this.numeroDelEmpleado2 = mensaje.NumeroEmpleado
      this.correoDelEmpelado = mensaje.EMAIL
      console.log("correo del empleado del jefe", this.correoDelEmpelado)


      });
    })



    this.pasesJefe$ = this.rhService.getPasesJefe(this.numUsuario);

  }


  autorizarPase(id,numero){

    if(numero===1){
    const res = {
      p_Autorizado: 1,
      p_AutorizadoSalida: 1,
      p_PaseDigitalId:id
    }

    this.botonesAutorizados= true;



    this.rhService.updatePases(res.p_Autorizado,res.p_AutorizadoSalida,res.p_PaseDigitalId).subscribe((res)=>{

      this.mat.open('COMPLETADO', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.getPasesJefe();
      this.insertarNotificacion(numero);
      this.sendEmail();
      // crear para mandar mensaje
      // console.log(res)
    })
  }if(numero==2){

    const res = {
      p_Autorizado: 0,
      p_AutorizadoSalida: 0,
      p_PaseDigitalId:id
    }


    this.rhService.updatePases(res.p_Autorizado,res.p_AutorizadoSalida,res.p_PaseDigitalId).subscribe((res)=>{

      console.log("escogiste eliminar pase")
      this.getPasesJefe();
      this.insertarNotificacion(numero);
      this.sendEmail2();

      this.mat.open('COMPLETADO', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

      // crear para mandar mensaje
      // console.log(res)
    })




  }

  }

  eliminarPase(id){

    this.rhService.eliminarPaseDigital(id).subscribe((res)=>{
      this.getPases();

      this.mat.open('se ha eliminado el pase', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });


    })
  }

  insertarNotificacion(numero){

    if(numero==1){
    const notificaciones={
      p_usuario_id:this.idDelEmpleadoDelJefe,
      p_mensaje:'se le ha autorizado su pase',
      p_tipo:'Incidencias'
    }

    this.rhService.insertarNotificacion(notificaciones.p_usuario_id,notificaciones.p_mensaje,notificaciones.p_tipo).subscribe((res)=>{

      if(res===true){

      }
    })}
    if(numero==2){



    const notificaciones={
      p_usuario_id:this.idDelEmpleadoDelJefe,
      p_mensaje:'se le ha denegado su pase',
      p_tipo:'Incidencias'
    }

    this.rhService.insertarNotificacion(notificaciones.p_usuario_id,notificaciones.p_mensaje,notificaciones.p_tipo).subscribe((res)=>{

      if(res===true){

      }
    })

    }

  }


  sendEmail(){
// para cuando se autoriza un pase del jefe
    const datos = {
      fecha:this.fechaDelPase ,
      numeroEmpleado: this.numeroDelEmpleado2,
      motivo : '',
      nombre : this.nombreDelEmpleado,
      nombreDelJefe:this.nombreDelJefe2,
      correo : 'practicante.sistemas@dikeninternational.com', // colocar el correo de alguien mas
      // correo: this.correo, // es el correo del empleado del jefe
      tipoDePase: this.tipoDePase
    }

    this.rhService.sendEmail(datos.fecha,datos.numeroEmpleado,datos.motivo,datos.nombre,datos.correo,datos.tipoDePase,datos.nombreDelJefe).subscribe(()=>{

    })

  }

  // es para enviar el mensaje no autorizado
  sendEmail2(){

    const datos = {
      fecha:this.fechaDelPase ,
      numeroEmpleado: this.numeroDelEmpleado2,
      motivo : '',
      nombre : this.nombreDelEmpleado,
      nombreDelJefe:this.nombreDelJefe2,
      // correo : 'practicante.sistemas@dikeninternatisssonal.com', // colocar el correo de alguien mas
      correo: this.correoDelEmpelado, // es el correo del empleado del jefe
      tipoDePase: this.tipoDePase
    }
    console.log(this.correoDelEmpelado)

    this.rhService.sendEmpleado(datos.fecha,datos.numeroEmpleado,datos.motivo,datos.nombre,datos.correo,datos.tipoDePase,datos.nombreDelJefe).subscribe(()=>{

    })



  }


}

//construir arreglo de mis datos con un arreglo para que se actualize
