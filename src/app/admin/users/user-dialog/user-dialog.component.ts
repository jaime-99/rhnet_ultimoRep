import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup,FormArray} from '@angular/forms';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings,Usuario1,Usuario} from '../user.model';
import { UsersComponent } from '../users.component';
import { SupportService } from '../../support/service/support.service';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { AppService } from 'src/app/app.service';
import { Md5 } from 'ts-md5';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { co } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';


@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
})
export class UserDialogComponent implements OnInit {
  profileForm: FormGroup;

  // ejemplo
  cambioContrasenia:UntypedFormGroup
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
  imagen: null;
  num_Usuario: any;
  boton: TreeMapModule;
  token: any;
  contra: any;
  selectedImage: File | null;
  selectedFile: File | null;
  nombreFoto: string;
  nombreImagen: any;
  tipoPerfil:number[] = [];

  usuariosRegistrados = [];
  UsuarioId: [];
  TipoDeUsuario: any;


  selectedPerfilIds: number[] = [];

  valoresSeleccionados= []
  valoresEnCheckBox: any;
  noSeleccionados: number[];
  perfilesDelUsuario: any;

  constructor(private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    public supportService: SupportService,
    public appService:AppService,private router:Router
  ) {



    this.form = this.fb.group({

    usuario: this.fb.group({
        p_UsuarioId: data.IdDeUsuario,disabled: true,
        p_Nombre: [[''], Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(25)]),],
        p_Apellidos: [[''], Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(20)]),],
        p_Telefono: [[''], Validators.compose([Validators.required, Validators.maxLength(10),Validators.minLength(10),  Validators.pattern(/^844\d{7}$/)]),],
        p_Imagen:[''],
        // p_Correo:data.email,
      }),

      contrasenia:this.fb.group({

        p_UsuarioId:data.IdDeUsuario,disabled:true,
        p_Password: [[''], Validators.compose([Validators.required, Validators.minLength(5)]),],
        p_PassRepeat:[[''], Validators.compose([Validators.required, Validators.minLength(5)]),],
        // p_repeatPass:['']
      }),



      tipoUsuario:this.fb.group({
        PerfilId: this.fb.array([]), //colocar que tipo de usuario es automatiamente
        UsuarioId:[data.IdDeUsuario, {disabled:true}],

      })
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





    this.obtenerTipoPerfil();
    this.obtenerUsuarioIdPerfil();

    //es el formgroup de cambiar contrasenia

      this.cambioContrasenia = this.fb.group({
        p_UsuarioId:this.data.IdDeUsuario,disabled:true,
          p_Password: [[''], Validators.compose([Validators.required, Validators.minLength(5)]),],
          p_PassRepeat:[[''], Validators.compose([Validators.required, Validators.minLength(5)]),],
      });

      this.contra = this.form.get('contrasenia.p_UsuarioId').value
      // console.log(this.contra);



    // todo inicializar los datos predeterminados

    this.nombre= this.data.name,
    this.apellidos = this.data.apellidos,
    this.correo = this.data.email,
    this.telefono = this.data.number,
    this.num_Usuario = this.data.numEmpleado,
    this.token=this.data.tokenId

    // incializar el numero de usuario


    // this.form.get('tipoUsuario.PerfilId').setValue(this.UsuarioId);
    // console.log(this.TipoDeUsuario);



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
    // console.log(this.data.name);

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


    // todo es el ngsubmit para que mande el mensaje



  }



  close(): void {
    this.dialogRef.close();
  }

  //jaime

  obtenerInformacion() {
    this.supportService.getObtenerUsuarios().subscribe(
      (res) => {
        // console.log(res);
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


          // console.log("Nombre del primer usuario:", this.nombreUsuario);
        } else {
          // console.log("El arreglo de usuarios está vacío.");
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
    // console.log(this.informacion);
  }

  modificarUsuario() {
    // Obtener los datos del formulario
    const formData = this.form.value;
    //obtengo el id
    const p_UsuarioId = this.data.IdDeUsuario;
    // console.log(p_UsuarioId);

    // const data = {
    //   p_UsuarioId: p_UsuarioId,
    //   p_Nombre: 'jaime',
    //   p_Apellidos: 'gonzalez',
    //   p_Telefono: '2222'
    // };

    // Agregar el id al cuerpo de la solicitud
    formData.p_UsuarioId = p_UsuarioId;

    // console.log(formData.usuario);

    // mandar ahora si el data al servicio
    this.supportService.modificarUsuarios(formData.usuario).subscribe(
      (res) => {
        console.log("Respuesta de la api " + res);
      },
      (error) => {
        console.error("Error al llamar a la API:", error);
      }

    ),
    this.mostrarNotificacion("se han modificado los datos.",{ panelClass: ['success'],verticalPosition:'top' });
    ;
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


  cambiarPass(){


  const pass = this.form.get('contrasenia.p_Password').value;
  const usu = this.form.get('contrasenia.p_UsuarioId').value;

  const formData = {
    p_UsuarioId: usu,
    p_Password: pass
  };

//validaciones
const passRepeat = this.form.get('contrasenia.p_PassRepeat').value; // Obtener el valor del campo de contraseña repetida

if (pass !== passRepeat) {
  console.log("Las contraseñas no coinciden");
   const config: MatSnackBarConfig = {
        panelClass: ['green-snackbar'],
        duration: 4000
      };
  this.mostrarNotificacion("Las contraseñas no coinciden. Por favor, verifica tus contraseñas.",{ panelClass: ['mat-toolbar', 'mat-warn'],verticalPosition:'top' });
  return;
} else {
  // this.mostrarNotificacionVerde("se ha modificado tu contraseña",{ panelClass: [status] });
  this.mostrarNotificacion("se ha cambiado la contraseña.",{ panelClass: ['success'],verticalPosition:'top' });




  // console.log("Las contraseñas son iguales");
  // console.log(formData);

  // Aquí puedes continuar con el resto del código
  // Encriptar la contraseña, llamar al servicio, etc.
}

//  console.log(formData);
  const hashedPassword = Md5.hashStr(formData.p_Password).toString();
  //actualizar la contra con la encriptada
  formData.p_Password = hashedPassword;

  this.appService.cambiarContraseniaNuevo(formData).subscribe((res) => {
    // console.log(res);
})
}

mostrarNotificacion(mensaje: string, config:MatSnackBarConfig) {
  this._snackBar.open(mensaje, 'Cerrar', config,)
}
mostrarNotificacionVerde(mensaje: string, config:MatSnackBarConfig) {
  this._snackBar.open(mensaje, 'Cerrar', config,)
}


//todo obtener la imagen

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  // console.log(this.selectedFile);
  this.nombreFoto = this.selectedFile.name

}

onSubmit() {
  if (this.selectedFile) {
    this.supportService.subirImagen(this.selectedFile).subscribe((res) => {
      //  console.log(res)
       this.cambiarImagen();

       this.mostrarNotificacion("se ha cambiado la foto de perfil.",{ panelClass: ['success'],verticalPosition:'top' });

    }

    )
  }
}

cambiarImagen(){
  const urlImagen ={
    p_NuevaImagen : 'https://dikeninternational.com/rhnet/uploads/'+ this.nombreFoto,
    p_UsuarioId : this.data.IdDeUsuario,

  }
  this.nombreImagen = urlImagen.p_NuevaImagen;

  // console.log(urlImagen);



  this.supportService.seCambiaFoto(urlImagen.p_UsuarioId,urlImagen.p_NuevaImagen).subscribe((res) => {
    // console.log(res)
  })
}



//todo es para el ngSubmit()
// public onInfoFormSubmit(values:Object):void {
//   if (this.form.valid) {
//     this.snackBar.open('has actualizado los datos de tu cuenta!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
//     // this.actualizarDatos();
//   }
// }



// es para cambiar el tipo de perfil a administrador etc..
cambiarPerfil(){

  //validacion de eliminar perfil, deben estar lleno el arrelgo
  if(this.noSeleccionados.length > 0){
  this.EliminarPerfil();
  }
  //obtengo los datos del formulario
  const formData = this.form.value;

  // console.log(formData.tipoUsuario)

  const tipoUsuario = {

    PerfilId:formData.tipoUsuario.PerfilId,
    UsuarioId:formData.tipoUsuario.UsuarioId

  }
  // console.log(tipoUsuario);
  // console.log(this.usuariosRegistrados);

    // console.log(tipoUsuario.UsuarioId)
    // console.log(tipoUsuario.PerfilId)
    const usuarioId = this.form.get('tipoUsuario.UsuarioId').value;

    // if (this.valoresSeleccionados.length <= this.valoresEnCheckBox.length) {
    //   let ultimoUsuarioIndex = 0; // Índice del último UsuarioId utilizado

    //   // Itera a través de los perfiles seleccionados
    //   this.valoresSeleccionados.forEach((perfilId: number) => {
    //     if (ultimoUsuarioIndex < this.UsuarioId.length) {
    //       // Obtiene el próximo UsuarioId disponible
    //       const usuarioId = this.UsuarioId[ultimoUsuarioIndex];

    //       // Llama al servicio para actualizar el perfil para el usuario
    //       this.supportService.updateTipoPerfil(perfilId, usuarioId).subscribe(response => {
    //         // Manejar la respuesta del servidor si es necesario
    //         console.log(`Perfil ${perfilId} actualizado para UsuarioId: ${usuarioId}`);
    //         console.log(response);
    //       });

    //       // Incrementa el índice del último UsuarioId utilizado
    //       ultimoUsuarioIndex++;
    //     }
    //   });
    // }


  // else if(this.valoresSeleccionados.length > this.valoresEnCheckBox.length){
  //   console.log("los valores seleccionados son mayores a los datos del usuario")


  //   // this.valoresSeleccionados =[]
  //   this.valoresSeleccionados.forEach((perfilId: number) => {
  //     // Llama al servicio para insertar un perfil a la vez
  //     this.supportService.cambiarTipoPerfil(perfilId, usuarioId).subscribe(response => {
  //       // Manejar la respuesta del servidor si es necesario

  //       console.log(" se supone que se inserta aun cuando ya tiene perfil ")
  //     });
  //   });


  // }

  // else {


    const perfilId = this.form.get('tipoUsuario.PerfilId').value;



    console.log("valoresSeleccionados:", this.valoresSeleccionados);
    console.log("perfilesDelUsuario:", this.perfilesDelUsuario);


    this.valoresSeleccionados.forEach((perfilId: number) => {
      // Verifica si el perfil ya está en perfilesDelUsuario
      if (!this.perfilesDelUsuario.includes(perfilId)) {
        // Llama al servicio solo si el perfil no está en perfilesDelUsuario
        this.supportService.cambiarTipoPerfil(perfilId, usuarioId).subscribe(response => {
          // Manejar la respuesta del servidor si es necesario
          console.log(`Perfil ${perfilId} insertado.`);
          console.log(response);
        });
      } else {
        console.log(`El perfil ${perfilId} ya está en perfilesDelUsuario.`);
      }
    });




    console.log(this.valoresSeleccionados)


}


EliminarPerfil(){
  const Id = this.form.get('tipoUsuario.UsuarioId').value;


  for (const perfilId of this.noSeleccionados) {
  this.supportService.eliminarTipoPerfil(Id,perfilId).subscribe((res)=>{

    console.log(res)
  })
}}

//obtener los tipos de perfiles que hay
obtenerTipoPerfil(){
  this.supportService.getObtenerTipoPerfil().subscribe((res)=>{
    this.tipoPerfil = res;

    console.log(this.tipoPerfil)

    // const perfiles = res.map(perfiles => perfiles.PerfilId);

    // console.log(perfiles)



  })
}

// es para obtener los perfiles que ya estan en la tabla de CO_PerfilUsuario
//para validar que si estan que no se agregue que solo se actualice el tipo de perfil
obtenerUsuarioIdPerfil(){
  this.supportService.getObtenerUsuarioIdPerfil().subscribe((res)=>{
    // this.usuariosRegistrados = res;
    // console.log(this.usuariosRegistrados)

    //obtengo los usuaarios iD'S con un map
    const usuarioIds = res.map(usuario => usuario.UsuarioId);

    const perfilId = res.map(perfil => perfil.PerfilUsuarioId);
    // console.log(perfilId)

    // console.log(usuarioIds);
    this.usuariosRegistrados = usuarioIds;

    const todos = res;
    // console.log(res);

    //con esto encuentro una sola columna del arreglo con un valor
    const objetoEncontrado = todos.filter(item => item.UsuarioId === this.data.IdDeUsuario);
    const perfilesIds = objetoEncontrado.map(item => item.PerfilId);
    console.log(perfilesIds) // para ver los tipo Perfiles' que tiene

    const perfilUsuarioId = objetoEncontrado.map(item => item.PerfilUsuarioId);
    console.log( "perfilUsuarioId " + perfilUsuarioId);

    this.UsuarioId = perfilUsuarioId



    // console.log(objetoEncontrado.PerfilUsuarioId);
    // console.log(objetoEncontrado.PerfilId);

    // this.UsuarioId = objetoEncontrado.PerfilUsuarioId // es para el PerfilUsuarioId de la tabla

    this.TipoDeUsuario = objetoEncontrado.PerfilId



    // this.valoresEnCheckBox = perfilesIds // con esto ya se colocan automaticamente
    this.perfilesDelUsuario = perfilesIds
    console.log( "perfiles del usuario " + this.perfilesDelUsuario)
    // console.log(this.valoresEnCheckBox.length)


    // this.valoresSeleccionados = perfilesIds



    // console.log(this.TipoDeUsuario);

    // this.form.get('tipoUsuario.PerfilId').setValue(this.TipoDeUsuario); // con esto se selecciona automaticamente el radioButton al valor que es

  })

}

//con esto ya guardo el arreglo de cada checkBox, ahora falta seleccionarlos y mandar al servicio
toggleSeleccion(tipo: any) {
  const index = this.valoresSeleccionados.findIndex((valor) => valor === tipo);
  if (index !== -1) {
    // Si ya está seleccionado, quítalo de la matriz
    this.valoresSeleccionados.splice(index, 1);
  } else {
    // Si no está seleccionado, agrégalo a la matriz
    this.valoresSeleccionados.push(tipo);
  }
  const numeros =[1,2,3,4]

  // this.noSeleccionados = numeros.filter((tipo) => !this.valoresSeleccionados.includes(this.valoresEnCheckBox));

  this.noSeleccionados = numeros.filter((numero) => !this.valoresSeleccionados.includes(numero));


  console.log( "valores que se seleccionan "+ this.valoresSeleccionados);
  console.log( "valores que no se seleccionan en checbox " + this.noSeleccionados)
}












}






