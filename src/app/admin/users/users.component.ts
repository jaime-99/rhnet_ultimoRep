import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { SupportService } from '../support/service/support.service';
import { Usuario } from './user.model';

// interface Usuario {
//   name: string;
//   number: string;
// }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]
})
export class UsersComponent implements OnInit {
    public users: User[];

    public usuarios=[];
    filteredUsers: Usuario[] = [];

    public searchText: string;
    public page:any;
    public settings: Settings;
    constructor(public appSettings:AppSettings,
                public dialog: MatDialog,
                public supportService:SupportService,
                public usersService:UsersService){
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.getUsers();

        this.getObtenerUsuarios();
    }

    public getUsers(): void {
        this.users = null; //for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);
    }
    public addUser(user:User){
        this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user:User){
        this.usersService.updateUser(user).subscribe(user => this.getUsers());
    }
    public deleteUser(user:User){
       this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
    }


    public onPageChanged(event){
        this.page = event;
        this.getUsers();
        window.scrollTo(0,0);
        // if(this.settings.fixedHeader){
        //     document.getElementById('main-content').scrollTop = 0;
        // }
        // else{
        //     document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        // }
    }

    public openUserDialog(data){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: data,

        })
        console.log(data.number);


        dialogRef.afterClosed().subscribe(user => {
            if(user){
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }

    //todo aqui empezo con lo mio jaime

    // obtener solo numero y nombre
    getObtenerUsuarios(): void {
      this.supportService.getObtenerUsuarios().subscribe(
        (res) => {
          console.log(res);
          this.usuarios = res.map((user: any) => {
            const usuario: Usuario = {
              name: user.Nombre,
              number: user.Telefono,
              email:user.Email,
              apellidos:user.Apellidos
            };
            console.log(usuario); // Realizar un console.log con los datos de nombre y número de cada usuario
          return usuario;
        });
        // this.filterUsers(); // Llamamos a la función para filtrar los usuarios

      },
        (error) => {
          console.error('Error al obtener usuarios', error);
        }
      );
    }

    // buscar con lupa

    filterUsers(): void {
      if (!this.searchText) {
        this.filteredUsers = this.usuarios;
      } else {
        this.filteredUsers = this.usuarios.filter((user) => {
          return user.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }
    }







}
