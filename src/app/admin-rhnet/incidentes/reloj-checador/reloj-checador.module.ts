import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelojChecadorComponent } from './reloj-checador.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogoComponent } from './dialogo/dialogo.component';
import { DialogoAvisoComponent } from './dialogo-aviso/dialogo-aviso.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';



export const routes: Routes = [
  { path: '', component: RelojChecadorComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [RelojChecadorComponent, DialogoComponent, DialogoAvisoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatButtonModule

  ]
})
export class RelojChecadorModule { }
