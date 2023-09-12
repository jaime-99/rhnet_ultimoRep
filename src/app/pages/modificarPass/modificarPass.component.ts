import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SupportService } from "src/app/admin/support/service/support.service";
import { FormControl, Validators } from "@angular/forms";
import { Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AlertaComponent } from "../dialogoDeAlerta/alerta/alerta.component";
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from "@angular/material/snack-bar";

declare var toastr: any;



@Component({
  selector: 'app-modificarPass',
  templateUrl: './modificarPass.component.html',
  styleUrls: ['./modificarPass.scss'],
})




export class modificarPass{

  constructor(private http: HttpClient ,
  public authService:SupportService,
  public router:Router,
  private dialog: MatDialog,
  public snackBar: MatSnackBar,
  renderer: Renderer2) {}
  correo:string="";
  correoEnviado = false;
  showConfirmation: boolean = false;
  dialogo:boolean=false;


//   recuperar() {
//     if (this.correo) {
//     this.authService.mandarCorreoRecuperacion(this.correo).subscribe(
//       response => {
//         console.log('Correo enviado correctamente');
//         // Otros pasos a seguir después de enviar el correo
//       },
//       error => {
//         console.error('Error al enviar el correo', error);
//         // Manejo de errores
//       }
//     );

//     }

// }

  mandarToken() {
  if (this.correo.endsWith('dikeninternational.com')) {
    this.authService.mandarCorreoToken(this.correo).subscribe((res) => {
      if (res.success) {
         // alert(res.message); // Mostrar mensaje de éxito en una alerta
        this.correoEnviado = true;
        this.dialogoAbierto();

      } else {
        // alert(res.message); // Mostrar mensaje de error en una alerta
        this.correoEnviado=false;
        this.snackBar.open('no se puede a',  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
    });
  } else {
    // alert('La terminación del correo no es válida');
    this.snackBar.open('la terminacion de correo no es valida, no se ha podido enviar el correo',  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3500 });
    this.correo ='';

    //toastr.success('Mensaje de éxito');
  }
}

irASesion(){
  this.router.navigate(['/sign-in']); // esto es para que me redireccione a ventas cuando inicio sesion

}
openConfirmationDialog() {
  this.showConfirmation = true;
}



mostrarMensajeAlerta(){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      message: "Se ha enviado un correo electronico al correo proporcionado"
    }

  });
  // cuando se cierra el dialogo
  // dialogRef.afterClosed().subscribe(result => {
  //   if (result) {
  //     this.mandarToken();
  //   }
  // });
}



openDialog() {
  this.dialog.open(ConfirmDialogComponent);

}

dialogoAbierto(){
  this.dialog.open(AlertaComponent);
}





}
