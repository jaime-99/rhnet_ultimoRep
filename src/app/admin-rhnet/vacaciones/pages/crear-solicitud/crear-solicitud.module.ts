import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearSolicitudComponent } from './crear-solicitud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

export const routes: Routes = [
  { path: '', component: CrearSolicitudComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [CrearSolicitudComponent, OpenDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule

  ]
})
export class CrearSolicitudModule { }
