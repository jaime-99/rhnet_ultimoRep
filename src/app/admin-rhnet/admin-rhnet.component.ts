import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { RhMenuService } from './components/menu/rhmenu.service';

@Component({
  selector: 'app-admin-rhnet',
  templateUrl: './admin-rhnet.component.html',
  styleUrls: ['./admin-rhnet.component.scss']
})
export class AdminRhnetComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;
  public userImage = 'assets/images/others/admin.jpg';
  public settings:Settings;
  public menuItems:Array<any>;
  public toggleSearchBar:boolean = false;
  userLogged: any;
  constructor(public appSettings:AppSettings,
              public router:Router,
              private menuService: RhMenuService){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.userImage=userauth.Imagen;

    this.userLogged=userauth.data.Usuario;

    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    };
    setTimeout(() => {
      //this.settings.theme = 'green';
    });
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
  //   if(usuarioAuth.EsServicio=="1")
  //   this.menuItems = this.menuService.getMenuItems(1);
  //   else
  //   this.menuItems = this.menuService.getMenuItems(0);
    this.menuItems = this.menuService.getMenuItems();
  // }
  }
  ngAfterViewInit(){
    if(document.getElementById('preloader')){
      document.getElementById('preloader').classList.add('hide');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if(window.innerWidth <= 960){
        this.sidenav.close();
      }
    });
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);

    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval);
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {
        window.scrollTo(0,0);
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    else{
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }

}
