import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosConsolidadosComponent } from "./pedidos-consolidados.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { TablaConsolidadoComponent } from "../../tablaDetalles/tabla-consolidado/tabla-consolidado.component";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from "src/app/theme/pipes/pipes.module";




export const routes: Routes = [
  { path: '', component: PedidosConsolidadosComponent, pathMatch: 'full' }
];


@NgModule({

  imports:[
    CommonModule ,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    MatTableModule, // Agregar MatTableModule a la lista de importaciones
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule, // Añade MatTabsModule a la lista de importaciones
    MatButtonToggleModule,
    MatIconModule,
    PipesModule,



  ],

  declarations: [
    PedidosConsolidadosComponent,
    TablaConsolidadoComponent,
  ],

  exports:[

    MatTableModule

  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class pedidosConsolidadosModule {}
