import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AltaBecarioComponent } from './altaBecario.component';


export const routes: Routes = [
  { path: '', component: AltaBecarioComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AltaBecarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,



  ]
})
export class altaBecarioModule { }
