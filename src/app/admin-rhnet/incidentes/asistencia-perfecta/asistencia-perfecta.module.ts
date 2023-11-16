import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaPerfectaComponent } from './asistencia-perfecta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

export const routes: Routes = [
  { path: '', component: AsistenciaPerfectaComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AsistenciaPerfectaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    RouterModule.forChild(routes),

  ]
})
export class AsistenciaPerfectaModule { }
