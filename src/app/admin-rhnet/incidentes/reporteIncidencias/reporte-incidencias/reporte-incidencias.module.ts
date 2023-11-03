import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteIncidenciasComponent } from './reporte-incidencias.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


export const routes: Routes = [
  { path: '', component: ReporteIncidenciasComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [ReporteIncidenciasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ReporteIncidenciasModule { }
