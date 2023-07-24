import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormField } from "@angular/material/form-field";
import { ActivatedRoute, Router } from '@angular/router';
import {NgIf} from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Md5 } from 'ts-md5';

import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { MensajeAlertaComponent } from '../mensajeAlerta/mensaje-alerta/mensaje-alerta.component';
import { AlertaComponent } from '../dialogoDeAlerta/alerta/alerta.component';




@Component({
  selector: "formulario-pass",
  templateUrl: "./formularioPass.component.html",
  styleUrls: ["./formularioPass.scss"],
})
export class formularioPass implements OnInit {
  @ViewChild('passwordField') passwordField!: ElementRef;
  @ViewChild('confirmPasswordField') confirmPasswordField!: ElementRef;
  // obtengo el correo y despues me da el id y ese se llena solo
  // ya cuando se llene solo el id solo cambiara el usuario y contra de ese id especifico
  usuarioId: "";
  usuario: "";
  nuevaContra: "";
  botonId = true;
  formData: any;
  value:string;
  showConfirmation: boolean = false;
  message="HOLA";
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

  confirmPassword: string;
  confirmPasswordError: boolean = false;
  hide = true;
  snackBar:string;


  // el correo  me lomdara automaticamente a cargar la pagina

  constructor(
    public appService: AppService,
    public Bar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public router:Router,

  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const tokenId = params.get("tokenid");
      console.log(tokenId);

      this.formData = {
        usuarioId: tokenId,
        p_UsuarioId: "",
        p_Usuario: "",
        p_Password: "",
        confirmPassword: ''

      };
      // Utiliza el valor de tokenId como necesites

      this.obtenerIdConToken(tokenId); // Llamar a la función con el TokenId como parámetro
    });


  }

  obtenerIdConToken(tokenId: string) {
    this.appService.obtenerUsuarioIdConToken(tokenId).subscribe((res) => {
      console.log(res);
      this.formData.p_UsuarioId = res.UsuarioId; // Okey ya se asigna
      console.log(this.formData.p_UsuarioId);
    });
  }

  clearPassword() {
    this.value='';
  }

  CorreoFormato = {
    p_Correo: "",
  };

  submitForm() {
    // Aquí puedes realizar acciones adicionales con los datos del formulario, como enviarlos a un servidor

    //todo checar por que no me funciona
    this.appService.cambiarContrasenia(this.formData).subscribe((res) => {
      console.log(res);
    });
  }

  verificarCorreo() {
    this.appService.verIdConCorreo(this.CorreoFormato.p_Correo).subscribe(
      (res) => {
        if (res && res.hasOwnProperty("Mensaje")) {
          const mensaje = res.Mensaje; // Obtener el mensaje del objeto de respuesta

          console.log(mensaje);
          const usuarioIdParte = mensaje.split(": ")[1]; // Suponiendo que el formato del mensaje sea "Correo enviado correctamente. UsuarioId: XXXX"
          const usuarioId = parseInt(usuarioIdParte); // Convertir a número entero si es necesario

          console.log("UsuarioId:", usuarioId);
          this.mostrarSnackBar(mensaje);
          this.formData.p_UsuarioId = usuarioId.toString();
        } else {
          console.log("Error en la respuesta de la API");
          this.mostrarSnackBar("Error en la respuesta de la API");
        }
      },
      (error) => {
        console.error("Error al verificar el correo", error);
      }
    );
  }

   mostrarSnackBar(mensaje: string) {
    this.Bar.open(mensaje, "Cerrar", {
      duration: 3000, // Duración en milisegundos
      verticalPosition: "top", // Posición vertical
      horizontalPosition: "center", // Posición horizontal
    });
  }





  cambiarNuevaContra() {
    //todo ya funciona
    if (this.formData.p_Password.length < 6 || this.formData.p_Password.length > 15 ||
      this.formData.p_Password !== this.formData.confirmPassword) {
      return;
    }
    // Encriptar la contraseña utilizando MD5

     // Encriptar la contraseña utilizando MD5
      const hashedPassword = Md5.hashStr(this.formData.p_Password).toString();

   // Actualizar el objeto formData con la contraseña encriptada
      this.formData.p_Password = hashedPassword;

    this.appService.cambiarContraseniaNuevo(this.formData).subscribe((res) => {
      console.log(res);

      // todo se colocara un mensaje de que se ha enviado con un boton para que lo rediriga al inicio


      //this.router.navigate(['/sign-in']); // esto es para que me redireccione a ventas cuando inicio sesion
      this.resetPasswordFields();
    });

  }

  Encriptpass(text:string):string {
    const md5 = new Md5();
    return md5.appendStr(text.toString().trim()).end().toString();
 }

  openConfirmationDialog() {
    this.showConfirmation = true;
  }

  mostrarMensajeAlerta(){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Cambiar Contraseña",
      message: "Estas seguro que quieres cambiar la Contraseña?"
    }

  });
  // cuando se cierra el dialogo
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.mensajeConfirmacion(); // se agrego esta linea
      this.cambiarNuevaContra();
    }
  });
}


// y estas dos ultimas lineas se agregaron hoy
mensajeConfirmacion(){

  const dialogRef = this.dialog.open(MensajeAlertaComponent, {
    maxWidth: "600px",
    data: {
      title: "se cambio la contraseña",
      message: "Se ha establecido la contraseña"
    }

  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.irAsesion();
    }
  });

}


irAsesion(){
  this.router.navigate(['/sign-in']); // esto es para que me redireccione a ventas cuando inicio sesion
}


resetPasswordFields(): void {
  // Establecer los campos de contraseña a una cadena vacía

  this.passwordField.nativeElement.value = '';
  this.confirmPasswordField.nativeElement.value = '';
}


}

  // obtenerIdConToken() {

  // this.appService.obtenerUsuarioIdConToken().subscribe((res) => {

  //   console.log(res);
  //   });

  // }
















