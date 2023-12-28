import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';
import { RhMenuService } from './rhmenu.service';
import { AccesoService } from 'src/app/guards/acceso.service';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ RhMenuService]
})
export class RhMenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu:Array<any>;
  public settings: Settings;
  perfiles: any
  usuarioId
  perfilVigilante:any[];
  mostrarApartado: boolean;
  constructor(public appSettings:AppSettings, public menuService:RhMenuService, private acceso:AccesoService,
    private rhService:RhnetService) {
    this.settings = this.appSettings.settings;

  }

  ngOnInit() {
  // this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // this.usuarioId = usuarioAuth.data.Numero_Empleado
    this.usuarioId = parseInt(usuarioAuth.data.Numero_Empleado, 10); // El segundo argumento, 10, es la base numérica (decimal).

    this.obtenerPerfil();




}




  onClick(menuId){
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);
    this.acceso.setAccesoPorBoton();

  }


  obtenerPerfil(){

    const perfilesAMostrar = [
      { perfil: 2, titulo: 'PASES AUTORIZADOS' }
    ];

    const titulosAMostrar: string[] = [];



    this.rhService.getPerfilVigilancia().subscribe((res:any)=>{
      this.perfiles = res



      const perfilUsuarioIds = this.perfiles.map((perfil) => perfil.perfilUsuarioId);
      // console.log(perfilUsuarioIds)



      if (perfilUsuarioIds.includes(this.usuarioId)) {
        // El usuarioId está en perfilVigilante
        // Agrega el menú a this.menuItems

        this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);


        // this.parentMenu = this.menuItems.filter(item => {
        //   return item.title === 'PASES AUTORIZADOS' || item.title === 'PASE DIGITAL'|| item.title === 'VACACIONES'||  titulosAMostrar.includes(item.title);
        // });

        // this.parentMenu.push(new RhMenu (32, 'PASES AUTORIZADOS', '/rhnet/PASES_AUTORIZADOS', null, 'alarm_on', null, false, 0)),

        // this.parentMenu.push(new RhMenu (33, 'PASES GENERADOS', '/rhnet/PASES_GENERADOS', null, 'receipt', null, false, 0)),


        // console.log("si se incluye")
      }else{
        // console.log("No se incluye el perfil de vigilante")
          this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);

        // console.log(this.usuarioId)
      }
    })




  }

}
