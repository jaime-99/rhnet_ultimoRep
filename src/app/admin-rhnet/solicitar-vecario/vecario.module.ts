import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';
import { DialogoVecarioComponent } from './openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



export const routes: Routes = [
  { path: '', component: AddComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [AddComponent,DialogoVecarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule




  ]
})
export class solicitarVecario { }
