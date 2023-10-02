import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nombre = '';
  correo = '';

  constructor( public appService: AppService  ) { }

  ngOnInit() {

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(userauth);

    this.nombre = userauth.Nombre;
    this.correo = userauth.Correo

  }

}
