import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup} from '@angular/forms';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings,Usuario1,Usuario} from '../user.model';
import { UsersComponent } from '../users.component';
import { SupportService } from '../../support/service/support.service';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  profileForm: FormGroup;

  // ejemplo
  nombreUsuario='';
  public form:UntypedFormGroup;
  public passwordHide:boolean = true;
  informacion=[];
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA)  public data: any,
              public fb: UntypedFormBuilder,public supportService:SupportService) {
    this.form = this.fb.group({
      id: null,
      username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      profile: this.fb.group({
        name: null,
        surname: null,
        birthday: null,
        gender: null,
        image: null
      }),
      work: this.fb.group({
        company: null,
        position: null,
        salary: null
      }),
      contacts: this.fb.group({
        email: null,
        phone: null,
        address: null
      }),
      social: this.fb.group({
        facebook: null,
        twitter: null,
        google: null
      }),
      settings: this.fb.group({
        isActive: null,
        isDeleted: null,
        registrationDate: null,
        joinedDate: null
      }),

      usuario:this.fb.group({
        name:[null , Validators.compose([Validators.required, Validators.minLength(5)])],
        number:null,
        email:null,
        apellidos:null,

      })
    });
  }

  ngOnInit() {
    this.data();

    this.obtenerInformacion2();
    this.initForm();
    this.obtenerInformacion();
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

  obtenerInformacion(){

    this.supportService.getObtenerUsuarios().subscribe(
      (res) => {
        console.log(res)
        this.informacion = res;
        if (res && res.length > 0) {
           this.nombreUsuario = res[0].Nombre;
          console.log('Nombre del primer usuario:', this.nombreUsuario);
        } else {
          console.log('El arreglo de usuarios está vacío.');
        }
      },
      (error) => {
        console.error('Error al obtener información', error);
      }
    );
  }


  initForm(): void {
    this.profileForm = this.fb.group({
      profile: this.fb.group({
        name: ['', Validators.required],
        number: ['', Validators.required],
        email: ['', Validators.required],
        image: ['']
      })
    });
  }


  obtenerInformacion2(): void {
    this.supportService.getObtenerUsuarios().subscribe(
      (res) => {
        console.log(res);

          this.profileForm.patchValue({
            profile:{
              name: res.Nombre,
              surname: res.Apellidos,
              birthday: res.FechaNacimiento,
              image: res.Imagen
            }
          }) // Rellenamos el formulario con los datos obtenidos
        },

      (error) => {
        console.error('Error al obtener información', error);
      }
    );
  }





}
