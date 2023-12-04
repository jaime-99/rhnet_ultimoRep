import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BecariosActivosComponent } from './becarios-activos.component';


export const routes: Routes = [
  { path: '', component: BecariosActivosComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [BecariosActivosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,



  ]
})
export class becariosActivoModule { }
