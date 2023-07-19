import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosConsolidadosComponent } from "./pedidos-consolidados.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { TablaConsolidadoComponent } from "../../tablaDetalles/tabla-consolidado/tabla-consolidado.component";




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
