import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes: Routes = [
  { path: '', component: SolicitudesComponent , pathMatch: 'full' }
];



@NgModule({
  declarations: [SolicitudesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class VerSolicitudesModule { }
