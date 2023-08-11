import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { SupportService } from 'src/app/admin/support/service/support.service';
// import { UserDialogComponent } from './user-dialog/user-dialog.component';





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
  nombreReal: any;
  selectedFile: any | File;
  nombreFoto: any;
  noEliminar: boolean = true;
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

    //para ver si puede eliminar su foto de perfil
    if(this.imagen === 'https://dikeninternational.com/rhnet/uploads/default.png'){
     this.noEliminar = false;
    }
    console.log(this.imagen);

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

  mostrarNotificacion(mensaje: string, config:MatSnackBarConfig) {
    this.snackBar.open(mensaje, 'Cerrar', config,)
  }





  // traer toda la info de el perfil

  obtenerDatos(){
  const p_UsuarioId = this.p_UsuarioId
  this.appService.obtenerTodosDatos(this.p_UsuarioId).subscribe((res)=>{
    console.log(res);

    this.apellidoUsuario = res.Apellidos
    this.direccion = res.Direccion
    this.nombreReal = res.Nombre;

  })

  }


  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];


  //   console.log(this.selectedFile);
  //   this.nombreFoto = this.selectedFile.name;

  //   this.supportService.cambiarImagen(this.selectedFile).subscribe((res)=>{
  //     console.log(res)
  //    })
  //   }
  // }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagen = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log('Nombre de la imagen seleccionada:', file.name);
      this.nombreFoto = file.name;
      console.log(this.nombreFoto);

      // Llamar al servicio para subir la imagen
     this.supportService.cambiarImagen(file).subscribe((res)=>{
      console.log(res)
      this.cambiarImagen();
     })
    }
  }

  cambiarImagen(){
    const urlImagen ={
      p_NuevaImagen : 'https://dikeninternational.com/rhnet/uploads/'+ this.nombreFoto,
      p_UsuarioId :  this.p_UsuarioId // conseguir el idDeUsuario

    }
    this.nombreFoto = urlImagen.p_NuevaImagen; // conseguir el nombre de la imagen

    console.log(urlImagen);

    this.supportService.seCambiaFoto(urlImagen.p_UsuarioId,urlImagen.p_NuevaImagen).subscribe((res) => {
      console.log(res)
    })

    this.mostrarNotificacion("se ha cambiado la foto de perfil.",{ panelClass: ['success'],verticalPosition:'top' });


  }


  eliminarImagen(){
    const info = {
      p_NuevaImagen :'https://dikeninternational.com/rhnet/uploads/default.png',
      p_UsuarioId : this.p_UsuarioId


    }


    this.imagen='https://dikeninternational.com/rhnet/uploads/default.png';

    this.supportService.seCambiaFoto(info.p_UsuarioId,info.p_NuevaImagen).subscribe((res)=>{
      console.log(res)

      this.mostrarNotificacion("se ha eliminado tu foto.",{ panelClass: ['want'],verticalPosition:'top' });

    })

  }




  }



