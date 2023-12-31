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
import { DetalleUsuarioComponent } from './detalle/detalleUsuario/detalleUsuario.component';
import { BajasComponent } from './bajas/bajas.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'empleados', // Redirecciona automáticamente a 'empleados' al acceder a la ruta base
    pathMatch: 'full',
  },
  {
    path: '',
    children: [

      {
        path: 'empleados',
        component: EmpleadosComponent,
        pathMatch: 'full',
        data: { breadcrumb: 'Lista' },
      },
      {
        path: 'detalle',
        component: DetalleComponent,
        // pathMatch: 'full',
        data: { breadcrumb: 'Detalles de empleados' }
      },
      {
        path: 'bajas',
        component: BajasComponent,
        // pathMatch: 'full',
        data: { breadcrumb: 'bajas de empleados' }

      },
    ]
  },
];

@NgModule({
  declarations: [EmpleadosComponent,filtrado,DetalleComponent,DetalleUsuarioComponent, BajasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatPaginatorModule,

  ],
  exports:[
    filtrado
  ]
})

export class EmpleadosModule { }
