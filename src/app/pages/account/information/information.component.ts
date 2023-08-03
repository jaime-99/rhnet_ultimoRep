import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { SupportService } from 'src/app/admin/support/service/support.service';
import { AppService } from 'src/app/app.service';
import * as internal from 'stream';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  usuarioId: any;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar, public supportService:SupportService
    ,public appService:AppService, public supportservice:SupportService) { }
    contrasenia:string = ''
    id = '';

  ngOnInit() {

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    console.log(userauth);

    this.usuarioId = userauth.data.INUsuarioId;




    this.infoForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern("[0-9]{10}")])]
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['',], // cambiar a p_password y p_usuarioId
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.snackBar.open('has actualizado los datos de tu cuenta!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.actualizarDatos();
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Tu contraseña ha cambiado perfectamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.cambiarContra();
    }
  }




  cambiarContra(){

    const contrasenia_1 = this.passwordForm.get('newPassword').value;
    // obtener usuarioId
    const usuario = this.usuarioId;


    const formData = {
      p_UsuarioId :usuario,
      p_Password : contrasenia_1
    }

    // encriptar contra
    const hashedPassword = Md5.hashStr(formData.p_Password).toString();
  //actualizar la contra con la encriptada
    formData.p_Password = hashedPassword;

    this.appService.cambiarContraseniaNuevo(formData).subscribe((res) => {
      console.log(res)
      this.infoForm.reset();
    });

  }



  actualizarDatos(){

    const usuarioId = this.usuarioId;
    const nombre = this.infoForm.get('firstName').value;
    const apellidos = this.infoForm.get('lastName').value;
    const telefono = this.infoForm.get('email').value;


    const formData = {
      p_UsuarioId :usuarioId,
      p_Nombre :nombre,
      p_Apellidos:apellidos,
      p_Telefono:telefono

    }

    this.supportService.modificarUsuarios(formData).subscribe((res) => {
      console.log(res)
      this.passwordForm.reset();

    })
  }
}
