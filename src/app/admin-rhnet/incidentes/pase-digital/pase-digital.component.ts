import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../../rhnet.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { useAnimation } from '@angular/animations';
import { ServicioCompartidoService } from '../../components/servicio-compartido.service';

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

  pases = []


  constructor(private fb:FormBuilder, public rhService:RhnetService,public dialog: MatDialog,private weService:ServicioCompartidoService) {

    this.pase = this.fb.group({
      username: ['', Validators.required], // Campo de usuario, requerido
      password: ['', Validators.required], // Campo de contraseña, requerido
    });
  }




  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numUsuario = usuarioAuth.data.Numero_Empleado

    this.rhService.getUsuariosPorId(this.usuario).subscribe((res:any)=>{
      // console.log(res)
      this.datosUsuario = res
      this.id_jefe = this.datosUsuario.id_jefe
      // console.log(this.id_jefe)
      this.fecha_alta = this.datosUsuario.fecha_alta

      this.getNameBoss();
      this.getPases();

    })

  }

  //obtener los datos del jefe de un usuario
  getNameBoss(){
    this.rhService.getUsuariosPorId1(this.id_jefe).subscribe((res:any)=>{
      // console.log(res)
      const usuarioJefe = res
      this.usuarioJefe = usuarioJefe.usuario
      this.numeroEmpleadoJefe = usuarioJefe.numero_empleado
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
  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: {p_NumeroEmpleado: this.numUsuario, p_Fecha: '', p_Tipo:'', p_Motivo:'',p_Autorizado: '', p_Empresa:'',
      p_NumeroEmpleadoJefe:'',p_Hora:'', p_AutorizadoSalida:'', p_HoraEntrada:'',p_HoraSalida:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('el dialogo se ha cerrado');
      const resultado = result;
      console.log(resultado)
    });

    this.weService.setVariable(this.numeroEmpleadoJefe);
  }


  getPases(){
    this.rhService.getPases().subscribe((data:any)=>{
      console.log(data)
      this.pases = data;



    })


  }


}
