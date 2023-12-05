import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BecariosActivosComponent } from './becarios-activos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DetallesBecarioComponent } from './detalles-becario/detalles-becario.component';


export const routes: Routes = [
  { path: '', component: BecariosActivosComponent, pathMatch: 'full' },
  { path: 'detalles', component: DetallesBecarioComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [BecariosActivosComponent, FilterPipe,DetallesBecarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,




  ]
})
export class becariosActivoModule { }
