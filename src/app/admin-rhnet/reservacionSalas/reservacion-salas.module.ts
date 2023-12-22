import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservacionSalasComponent } from './reservacionSalas.component';
import { RouterModule, Routes } from '@angular/router';
import { CrearReservacionComponent } from './crearReservacion/crearReservacion.component';
import { FormatarHoraPipe } from './pipes/horas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

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
    ReservacionSalasComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule

  ],
  exports: [
    FormatarHoraPipe
  ]
})
export class ReservacionSalasModule { }
