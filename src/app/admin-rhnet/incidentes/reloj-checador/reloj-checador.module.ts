import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelojChecadorComponent } from './reloj-checador.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogoComponent } from './dialogo/dialogo.component';



export const routes: Routes = [
  { path: '', component: RelojChecadorComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [RelojChecadorComponent, DialogoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ]
})
export class RelojChecadorModule { }
