import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NuloMovimientoComponent } from './nulo-movimiento.component';
import {MatTableModule} from '@angular/material/table';

export const routes: Routes = [
  { path: '', component: NuloMovimientoComponent, pathMatch: 'full' },
];


@NgModule({
  declarations: [
    NuloMovimientoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule

  ]
})
export class NuloMovimientoModule { }
