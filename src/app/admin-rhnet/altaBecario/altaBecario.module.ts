import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AltaBecarioComponent } from './altaBecario.component';
import { AltaComponent } from './alta/alta.component';


export const routes: Routes = [
  { path: '', component: AltaBecarioComponent, pathMatch: 'full' },
  { path: 'Alta_practicante', component: AltaComponent, pathMatch: 'full' ,data: { breadcrumb: 'Alta Practicante' }}
];

@NgModule({
  declarations: [AltaBecarioComponent,AltaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,



  ]
})
export class altaBecarioModule { }
