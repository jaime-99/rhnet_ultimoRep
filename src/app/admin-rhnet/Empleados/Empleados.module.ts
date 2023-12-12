// EmpleadosModule

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './Empleados.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { becariosActivoModule } from '../becarios-activos/becarios-activos.module';
import { filtrado } from './pipes/filtrado.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetalleComponent } from './detalle/detalle.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmpleadosComponent,
        pathMatch: 'full',
        data: { breadcrumb: 'Empleados' } // Especifica el breadcrumb solo para la ruta base 'empleados'
      },
      {
        path: 'detalle',
        component: DetalleComponent,
        pathMatch: 'full',
        data: { breadcrumb: 'Detalle' } // Especifica el breadcrumb solo para la ruta base 'empleados'
      },
    ]
  },
];

@NgModule({
  declarations: [EmpleadosComponent,filtrado,DetalleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatPaginatorModule
  ]
})

export class EmpleadosModule { }
