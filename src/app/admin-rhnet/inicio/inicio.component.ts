import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../rhnet.service';
import { AccesoService } from 'src/app/guards/acceso.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  empresa = ''
  correo = ''
  nombreCompleto = ''
  numEmpleado: any;
  usuario = ''
  password = ''
  fechaAlta = ''




  info: FormGroup; // es del formgroup



  constructor(private fb: FormBuilder, private accesoService:AccesoService) {

    this.info = this.fb.group({
      username: ['', Validators.required], // Campo de usuario, requerido
      password: ['', Validators.required], // Campo de contraseña, requerido
    });
  }




  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)

    this.accesoService.resetAcceso;



    this.empresa = usuarioAuth.data.Empresa
    this.correo = usuarioAuth.Correo
    this.numEmpleado = usuarioAuth.data.Numero_Empleado
    this.usuario = usuarioAuth.data.Usuario


  }


  onSubmit(){


  }

}
