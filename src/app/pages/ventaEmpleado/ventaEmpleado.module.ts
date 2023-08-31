import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VentaEmpleadoComponent } from './ventaEmpleado';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';



// modulos nuevos

export const routes: Routes = [
  { path: '', component: VentaEmpleadoComponent, pathMatch: 'full' }
];

@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  declarations: [
    VentaEmpleadoComponent
  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class VentaEmpleadoModule {}








