import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from 'src/app/guards/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoGuard implements CanActivate {

  constructor(private router: Router, private accesoService:AccesoService) {}



  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   // Verifica si la ruta solicitada contiene más de "rhnet/"
  //   if (state.url.startsWith('/rhnet/')) {
  //     // El usuario intenta acceder a una ruta no permitida, redirige a la página de inicio
  //     this.router.navigate(['/rhnet']);
  //     return false;
  //   }
  //   return true;
  // }


  canActivate(): boolean {
    if (this.accesoService.haAccedidoPorBoton()) {
      // El usuario ha accedido a través de un botón, permitir el acceso.
      return true;
    } else {
      // El usuario no ha accedido a través de un botón, redirigir a la página de inicio.
      this.router.navigate(['/rhnet']); // Cambia '/inicio' por la ruta que desees.
      return false;
    }
  }
}


