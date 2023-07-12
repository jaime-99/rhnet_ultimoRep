import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormField } from "@angular/material/form-field";
import { ActivatedRoute } from '@angular/router';
import {NgIf} from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';






@Component({
  selector: "formulario-pass",
  templateUrl: "./formularioPass.component.html",
  styleUrls: ["./formularioPass.scss"],
})
export class formularioPass implements OnInit {
  // obtengo el correo y despues me da el id y ese se llena solo
  // ya cuando se llene solo el id solo cambiara el usuario y contra de ese id especifico
  usuarioId: "";
  usuario: "";
  nuevaContra: "";
  botonId = true;
  formData: any;
  value:string;
  showConfirmation: boolean = false;

  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

  confirmPassword: string;
  confirmPasswordError: boolean = false;
  hide = true;



  // el correo  me lomdara automaticamente a cargar la pagina

  constructor(
    public appService: AppService,
    public Bar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
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

  private mostrarSnackBar(mensaje: string) {
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
    // Realiza la llamada al servicio solo si la contraseña cumple con los requisitos
    this.appService.cambiarContraseniaNuevo(this.formData).subscribe((res) => {
      console.log(res);
    });
  }

  openConfirmationDialog() {
    this.showConfirmation = true;
  }

  // obtenerIdConToken() {

  // this.appService.obtenerUsuarioIdConToken().subscribe((res) => {

  //   console.log(res);
  //   });

  // }
}















