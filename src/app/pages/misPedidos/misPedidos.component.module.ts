import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {misPedidos } from './misPedidos.component'; // lo importamos
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from "@angular/material/dialog";
import { detalles } from './detalles.component'; // importamos
import {MatIconModule} from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';






export const routes: Routes = [
  { path: '', component: misPedidos, pathMatch: 'full' }
];


@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule, // Añade MatTabsModule a la lista de importaciones



  ],
  declarations: [
    misPedidos,
    detalles,


  ],

  exports:[
    misPedidos,
    detalles

  ],


  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class misPedidosModule {}
