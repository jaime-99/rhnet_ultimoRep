import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BecariosActivosComponent } from './becarios-activos.component';
import { FilterPipe } from './pipes/filter.pipe';


export const routes: Routes = [
  { path: '', component: BecariosActivosComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [BecariosActivosComponent, FilterPipe],
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
