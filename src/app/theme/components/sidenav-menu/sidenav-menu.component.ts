import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SidenavMenuService } from './sidenav-menu.service';
import { AppService } from 'src/app/app.service';
import { Route, Router } from '@angular/router';
import { SidenavMenu } from './sidenav-menu.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenu } from '@angular/material/menu';




@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [ SidenavMenuService ]
})
export class SidenavMenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu:Array<any>;

  mostrarApartado: boolean= false;
  mostrarConsolidados = false;
  mostrarNuloMovimiento = false;
  searchText: any;
  selectedCategory: any;




  constructor(private sidenavMenuService:SidenavMenuService, public appService1:AppService,  private router: Router ) { }

  ngOnInit() {
    // this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId); //!esto muestra las opciones
    this.mostrarAdmin();
    // this.search();

  //   this.mostrarAdmin();
  //   // todo es para mostrar a solo los admin
  //   this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);

  // // Filtrar los elementos de menú para separar los que son "Administración" y los demás
  // const adminMenu = this.parentMenu.filter(item => item.esAdmin);
  // const otherMenus = this.parentMenu.filter(item => !item.esAdmin);

  // // Si el usuario actual es administrador, agregamos los elementos de menú "Administración" al array de otros menús.
  // if (this.mostrarApartado) {
  //   this.parentMenu = otherMenus.concat(adminMenu);
  // } else {
  //   this.parentMenu = otherMenus;
  // }
  // // todo se acaba para mostrar a solo los admin

  }

  onClick(menuId,title){
    this.sidenavMenuService.toggleMenuItem(menuId);
    this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);



    // this.searchText = category;
    // this.search();
    this.selectedCategory = title;

  }

  getSubMenuItems(menuId: number): SidenavMenu[] {
    const subMenus = this.menuItems.filter(item => item.parentId === menuId);
    console.log('Submenus:', subMenus);
    return subMenus;

  }





  mostrarAdmin() {


    const perfilesAMostrar = [
      { perfil: 2, titulo: 'ADMINISTRACION' },
      { perfil: 4, titulo: 'CONSOLIDADOS' },
      { perfil: 5, titulo: 'NULO MOVIMIENTO' },
    ];


      let userauth = JSON.parse(localStorage.getItem('datalogin')!);

      // Inicializa las variables en false por defecto
      this.mostrarApartado = false;
      this.mostrarNuloMovimiento = false;
      this.mostrarConsolidados = false;

      const titulosAMostrar: string[] = [];


      // Filtra los perfiles a mostrar en base al usuario
      perfilesAMostrar.forEach((perfil) => {
        this.appService1.obtenerPerfil(perfil.perfil).subscribe((res) => {
          if (res !== null && res.includes(userauth.data.INUsuarioId)) {
            if (perfil.titulo === 'ADMINISTRACION') {
              this.mostrarApartado = true;
            } else if (perfil.titulo === 'NULO MOVIMIENTO') {
              this.mostrarNuloMovimiento = true;
            } else if (perfil.titulo === 'CONSOLIDADOS') {
              this.mostrarConsolidados = true;
            }
            titulosAMostrar.push(perfil.titulo);
            this.parentMenu = this.menuItems.filter(item => {
              return item.title === 'PRODUCTOS' || item.title === 'MIS PEDIDOS' || item.title === 'Cerrar Sesion' || titulosAMostrar.includes(item.title);
            });
          }
        });


      });
    }





    // let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    // //mostrar admin
    // this.appService1.obtenerPerfil(2).subscribe((res) => {
    //   if (res !== null && res.includes(userauth.data.INUsuarioId)) {
    //     this.mostrarApartado = true;

    //     this.parentMenu = this.menuItems.filter(
    //       item => item.title === 'PRODUCTOS' || item.title === 'MIS PEDIDOS' || item.title === 'Cerrar Sesion'|| item.title ==='ADMINISTRACION'
    //      );

    //   } else {
    //     this.mostrarApartado = false;
    //   }
    // });

    // //mostrar nulo ventas
    // this.appService1.obtenerPerfil(5).subscribe((res) => {
    //   if (res !== null && res.includes(userauth.data.INUsuarioId)) {
    //     this.mostrarNuloMovimiento =true;
    //     this.parentMenu = this.menuItems.filter(
    //       item => item.title === 'PRODUCTOS' || item.title === 'MIS PEDIDOS' || item.title === 'Cerrar Sesion'|| item.title ==='NULO MOVIMIENTO'
    //      );
    //   }else{
    //     this.mostrarNuloMovimiento=false;
    //   }
    // });

    // //mostar consolidados
    // this.appService1.obtenerPerfil(4).subscribe((res)=>{
    //   // console.log(res)
    //   if (res !== null && res.includes(userauth.data.INUsuarioId)) {
    //     this.mostrarConsolidados=true;

    //     this.parentMenu = this.menuItems.filter(
    //       item => item.title === 'PRODUCTOS' || item.title === 'MIS PEDIDOS' || item.title === 'Cerrar Sesion'|| item.title ==='CONSOLIDADOS'
    //      );
    //   }else{
    //     this.mostrarConsolidados= false;
    //   }
    // })









  // para buscar en la categoria

  search() {
    let queryParams: any = {};
    queryParams.textSearch = this.searchText;

    // Filtrar opciones de menú según el texto de búsqueda
    this.parentMenu = this.menuItems.filter(item =>
      item.title.includes(this.searchText) || item.title === 'Quimico' || item.title === 'Equipos'
    );

    // this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }
    // this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/productos', this.searchText], { queryParams: queryParams });
  }



  // isMenuOpen = false;

  // // Referencia al menú desplegable
  // @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  // // Función para abrir el menú cuando se hace clic en un elemento del menú
  // openMenu(): void {
  //   if (this.menuTrigger) {
  //     this.menuTrigger.openMenu();
  //   }
  // }


  //todo nuevo
  onClickCategory(category: string) {
    this.searchText = category;

    console.log(category)
    // this.search();

  }


  selectedSubMenuName: string | null = null; // Propiedad para almacenar el nombre del submenú seleccionado

// Función para manejar el clic en un submenú y almacenar su nombre
onClickSubMenu(subMenuName: string) {
  this.selectedSubMenuName = subMenuName;
}



  //todo se termina


}





