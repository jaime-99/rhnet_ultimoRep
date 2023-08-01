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

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    console.log(userauth);

    this.nombre = userauth.Nombre
    this.apellidos = userauth.Apellidos;
    this.correo = userauth.Correo;
    this.imagen = userauth.Imagen;
    this.numEmpleado = userauth.data.Numero_Empleado;


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





}
