import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearSolicitudComponent } from './crear-solicitud.component';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes: Routes = [
  { path: '', component: CrearSolicitudComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [CrearSolicitudComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ]
})
export class CrearSolicitudModule { }
