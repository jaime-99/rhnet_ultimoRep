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
    let userauth = JSON.parse(localStorage.getItem('datalogin')!);

    this.appService1.obtenerAdmin().subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarApartado = true;
        //console.log("Mostrar el apartado para el usuario actual");
        if (this.mostrarApartado) {
          this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
        }
      } else {
        this.mostrarApartado = false;
        //console.log("No mostrar el apartado para el usuario actual");

        this.parentMenu = this.menuItems.filter(
          item => item.title === 'PRODUCTOS' || item.title === 'MIS PEDIDOS' || item.title === 'Cerrar Sesion'
         );
      }
    });
  }


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





