import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprobarBecarioRHComponent } from './aprobarBecarioRH.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { detallesComponent } from './detallesAprobar/detalles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


export const routes: Routes = [
  { path: '', component: AprobarBecarioRHComponent, pathMatch: 'full' },
  { path: 'detalles', component: detallesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AprobarBecarioRHComponent,detallesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,



  ]
})
export class AprobarBecarioRHModuleModule { }
