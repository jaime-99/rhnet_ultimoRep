import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { SupportService } from 'src/app/admin/support/service/support.service';






@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  billingForm: UntypedFormGroup;
  shippingForm: UntypedFormGroup;
  countries = [];
  usuario = [];
  nombre:string='';
  apellidos:string='';
  correo: any;
  imagen: any;
  numEmpleado: any;
  p_UsuarioId= '';
  apellidoUsuario: any;
  direccion: any;
  constructor(public appService:AppService, public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,
    public supportService:SupportService) { }

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.billingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
    });
    this.shippingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': '',
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });

    console.log('Aqui estaran los datos')

    // obtendre los datos de el usuario que esta logeado


    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    console.log(userauth);



    this.nombre = userauth.Nombre
    this.apellidos = userauth.Apellidos;
    this.correo = userauth.Correo;
    this.imagen = userauth.Imagen;
    this.numEmpleado = userauth.data.Numero_Empleado;
    this.p_UsuarioId = userauth.data.INUsuarioId;
    console.log(this.p_UsuarioId);

    this.obtenerDatos();

  }

  public onBillingFormSubmit(values:Object):void {
    if (this.billingForm.valid) {
      this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onShippingFormSubmit(values:Object):void {
    if (this.shippingForm.valid) {
      this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }


  getDatos(){

    this.supportService.getObtenerUsuarios().subscribe((res) =>{
      console.log(res)
    })
  }






  // traer toda la info de el perfil

  obtenerDatos(){
  const p_UsuarioId = this.p_UsuarioId
  this.appService.obtenerTodosDatos(this.p_UsuarioId).subscribe((res)=>{
    console.log(res);

    this.apellidoUsuario = res.Apellidos
    this.direccion = res.Direccion

  })

  }



}
