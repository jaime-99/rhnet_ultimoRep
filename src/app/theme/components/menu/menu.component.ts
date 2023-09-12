import { Component, OnInit, Input} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaService } from 'src/app/admin-mesadeayuda/ma.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  numerodeUsuario: any;
  mostrarApartado = false;
  NumeroEmpleado: any;
  categoriasProducto: any[];

  constructor(public appService:MaService,public router:Router,
   public appService1: AppService) { }

  ngOnInit()  { this.mostrarAdmin();


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.NumeroEmpleado = userauth.data.INUsuarioId;
    //console.log(this.NumeroEmpleado)

    this.obtenerCategorias();

  }
  GotoBigData()
  {
    window.open('https://www.dikeninternational.com/bigdata/', '_blank');
  }
  GotoMesadeAyuda()
{
  window.open('https://dikeninternational.com/mesadeayuda', '_blank');
}
GotoRHNET()
{
  window.open('https://rhnet.dikeninternational.com/rh_login.php', '_blank');
}
GotoUniversidadDiken()
{
  window.open('https://www.unidiken.dikeninternational.com', '_blank');
}
  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  public search(event:any){


    let searchText = event;
    //console.log(searchText);


    let queryParams: any = {};
    queryParams.textSearch=searchText;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }


    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/productos',searchText],{queryParams:queryParams});
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }


  //todo esto es para que solo se muestre la opcion para los administradores de venta

  mostrarAdmin() {
    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    //console.log(userauth);

    this.appService1.obtenerAdmin().subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarApartado = true;
        //console.log("Mostrar el apartado para el usuario actual");
      } else {
        this.mostrarApartado = false;
        //console.log("No mostrar el apartado para el usuario actual");
      }
    });
  }

  mostrarConfigurarion(){

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    //console.log(userauth);

  }

  equiposMenuVisible = false;

  toggleEquiposMenu(): void {
    this.equiposMenuVisible = !this.equiposMenuVisible; // Cambiar de true a false y viceversa
  }


  obtenerCategorias(){
    //se obtendran las categorias dinamicamente

      this.appService1.obtenerCategoriasProducto().subscribe((res) =>{
      console.log(res);

      this.categoriasProducto = res;

    })
  }




}
