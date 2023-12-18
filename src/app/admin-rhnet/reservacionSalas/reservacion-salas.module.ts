import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservacionSalasComponent } from './reservacionSalas.component';
import { RouterModule, Routes } from '@angular/router';
import { CrearReservacionComponent } from './crearReservacion/crearReservacion.component';
import { FormatarHoraPipe } from './pipes/horas.component';

export const routes: Routes = [
  {
    path: '',
    component: ReservacionSalasComponent,
    pathMatch: 'full',
  },
  { path: 'crear_reservacion', component: CrearReservacionComponent, pathMatch: 'full',data: { breadcrumb: 'Crear Reservacion' } },

];

@NgModule({
  declarations: [
    CrearReservacionComponent,
    FormatarHoraPipe,
    ReservacionSalasComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    FormatarHoraPipe
  ]
})
export class ReservacionSalasModule { }
