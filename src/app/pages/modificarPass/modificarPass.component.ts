import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SupportService } from "src/app/admin/support/service/support.service";
import { FormControl, Validators } from "@angular/forms";
import { Renderer2 } from '@angular/core';
import { Router } from "@angular/router";

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
  renderer: Renderer2) {}
  correo:string="";
  correoEnviado = false;


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


      } else {
        alert(res.message); // Mostrar mensaje de error en una alerta
        this.correoEnviado=false;
      }
    });
  } else {
    alert('La terminación del correo no es válida');

    //toastr.success('Mensaje de éxito');
  }
}

irASesion(){
  this.router.navigate(['/sign-in']); // esto es para que me redireccione a ventas cuando inicio sesion

}



}


