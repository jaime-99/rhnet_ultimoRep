import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup} from '@angular/forms';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings,Usuario1,Usuario} from '../user.model';
import { UsersComponent } from '../users.component';
import { SupportService } from '../../support/service/support.service';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
})
export class UserDialogComponent implements OnInit {
  profileForm: FormGroup;

  // ejemplo
  nombreUsuario = "";
  public form: UntypedFormGroup;
  public usuarioForm: FormGroup;
  public passwordHide: boolean = true;
  informacion = [];
  telefono: any;
  correo: any;
  apellidos: any;
  contrasenia: any;
  nombre: any;
  nombreDeUsuario: any;
  imagen: File| null;
  num_Usuario: any;
  boton: TreeMapModule;
  token: any;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    public supportService: SupportService,
    public appService:AppService,
  ) {
    this.form = this.fb.group({
      // id: null,
      // username: [
      //   null,
      //   Validators.compose([Validators.required, Validators.minLength(5)]),
      // ],
      // password: [
      //   null,
      //   Validators.compose([Validators.required, Validators.minLength(6)]),
      // ],
      // profile: this.fb.group({
      //   name: null,
      //   surname: null,
      //   birthday: null,
      //   gender: null,
      //   image: null,
      // }),
      // work: this.fb.group({
      //   company: null,
      //   position: null,
      //   salary: null,
      // }),
      // contacts: this.fb.group({
      //   email: null,
      //   phone: null,
      //   address: null,
      // }),
      // social: this.fb.group({
      //   facebook: null,
      //   twitter: null,
      //   google: null,
      // }),
      // settings: this.fb.group({
      //   isActive: null,
      //   isDeleted: null,
      //   registrationDate: null,
      //   joinedDate: null,
      // }),

      usuario: this.fb.group({
        p_UsuarioId: data.IdDeUsuario,disabled: true,
        p_Nombre: [[''], Validators.compose([Validators.required, Validators.maxLength(25)]),],
        p_Apellidos: [[''], Validators.compose([Validators.required, Validators.maxLength(30)]),],
        p_Telefono: [[''], Validators.compose([Validators.required, Validators.maxLength(10)]),],
        p_Imagen:[''],
        // p_Correo:data.email,
      }),
    });
  }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      number: null,
      email: null,
      apellidos: null,
    });

    // todo inicializar los datos predeterminados

    this.nombre= this.data.name,
    this.apellidos = this.data.apellidos,
    this.correo = this.data.email,
    this.telefono = this.data.number,
    this.num_Usuario = this.data.numEmpleado,
    this.token=this.data.tokenId





    this.form.patchValue({
      usuario: {
        p_Nombre: this.nombre,
        p_Apellidos: this.apellidos,
        p_Telefono:this.telefono,


      }
    });


    // this.obtenerInformacion2();
    // this.initForm();
    this.obtenerInformacion();
    // this.getObtenerUsuarios();
    console.log(this.data.name);
    // if(this.user){
    //   this.form.setValue(this.user);
    // }
    // else{
    //   this.user = new User();
    //   this.user.profile = new UserProfile();
    //   this.user.work = new UserWork();
    //   this.user.contacts = new UserContacts();
    //   this.user.social = new UserSocial();
    //   this.user.settings = new UserSettings();
    //   this.user.usuario1 = new Usuario1();
    // }
  }

  close(): void {
    this.dialogRef.close();
  }

  //jaime

  obtenerInformacion() {
    this.supportService.getObtenerUsuarios().subscribe(
      (res) => {
        console.log(res);
        this.informacion = res;
        if (res && res.length > 0) {
          this.nombre = this.data.name;
          this.apellidos = this.data.apellidos;
          this.telefono = this.data.number;
          this.correo = this.data.email;
          this.contrasenia = this.data.contraseña;
          this.nombreDeUsuario = this.data.nombreUsuario;
          this.imagen = this.data.imagen;
          this.num_Usuario= this.data.numEmpleado

          console.log("Nombre del primer usuario:", this.nombreUsuario);
        } else {
          console.log("El arreglo de usuarios está vacío.");
        }
      },
      (error) => {
        console.error("Error al obtener información", error);
      }
    );
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      profile: this.fb.group({
        name: ["", Validators.required],
        number: ["", Validators.required],
        email: ["", Validators.required],
        image: [""],
      }),
    });
  }

  // obtenerInformacion2(): void {
  //   this.supportService.getObtenerUsuarios().subscribe(
  //     (res) => {
  //       console.log(res);

  //         this.profileForm.patchValue({
  //           profile:{
  //             name: res.Nombre,
  //             surname: res.Apellidos,
  //             birthday: res.FechaNacimiento,
  //             image: res.Imagen
  //           }
  //         }) // Rellenamos el formulario con los datos obtenidos
  //       },

  //     (error) => {
  //       console.error('Error al obtener información', error);
  //     }
  //   );
  // }

  infoUsuario() {
    this.data = this.informacion;
    console.log(this.informacion);
  }

  modificarUsuario() {
    // Obtener los datos del formulario
    const formData = this.form.value;
    //obtengo el id
    const p_UsuarioId = this.data.IdDeUsuario;
    console.log(p_UsuarioId);

    // const data = {
    //   p_UsuarioId: p_UsuarioId,
    //   p_Nombre: 'jaime',
    //   p_Apellidos: 'gonzalez',
    //   p_Telefono: '2222'
    // };

    // Agregar el id al cuerpo de la solicitud
    formData.p_UsuarioId = p_UsuarioId;

    console.log(formData.usuario);

    // mandar ahora si el data al servicio
    this.supportService.modificarUsuarios(formData.usuario).subscribe(
      (res) => {
        console.log("Respuesta de la api " + res);
      },
      (error) => {
        console.error("Error al llamar a la API:", error);
      }
    );
  }

  // Boton desactivado
  BotonDesactivado(){

    if(this.form.controls.p_Nombre = null){
      this.boton = false

    }else{
      this.boton=true;
    }

  }

  // pasar el token para la contraseña


  // obtenerIdConToken(tokenId: string) {
  //   this.appService.obtenerUsuarioIdConToken(tokenId).subscribe((res) => {
  //     console.log(res);
  //     this.data.p_UsuarioId = res.UsuarioId; // Okey ya se asigna
  //     console.log(this.data.p_UsuarioId);
  //   });
  // }

  //todo obtener la imagen

  selectedImage: File | null;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.imagen = file;
}





}



