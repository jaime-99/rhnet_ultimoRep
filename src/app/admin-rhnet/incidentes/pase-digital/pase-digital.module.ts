import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseDigitalComponent } from './pase-digital.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export const routes: Routes = [
  { path: '', component: PaseDigitalComponent, pathMatch: 'full' }
];




@NgModule({
  declarations: [
    OpenDialogComponent,
    PaseDigitalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,


  ]
})
export class PaseDigitalModule { }
