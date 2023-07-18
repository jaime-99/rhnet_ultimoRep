import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosConsolidadosComponent } from "./pedidos-consolidados.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatButtonModule } from '@angular/material/button';




export const routes: Routes = [
  { path: '', component: PedidosConsolidadosComponent, pathMatch: 'full' }
];


@NgModule({

  imports:[
    CommonModule ,
    RouterModule.forChild(routes),
    MatButtonModule,
  ],

  declarations: [
    PedidosConsolidadosComponent,
  ],

  exports:[

  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class pedidosConsolidadosModule {}
