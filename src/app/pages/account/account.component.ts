import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Tablero de la cuenta', href: 'dashboard', icon: 'dashboard' },
    { name: 'Informacion de la cuenta', href: 'addresses', icon: 'info' },
    { name: 'Configuracion de la cuenta', href: 'information', icon: 'build' },
    { name: 'Historial de Pedidos', href: 'orders', icon: 'add_shopping_cart' },
    { name: 'Cerrar Sesion', href: '/sign-in', icon: 'power_settings_new' },
  ];
  constructor(public router:Router) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(window.innerWidth < 960){
          this.sidenav.close();
        }
      }
    });
  }

}
