import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MisEvaluacionesComponent } from './misEvaluaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EvaluacionFechaComponent } from './evaluacionFecha/evaluacionFecha.component';
import { FormsModule } from '@angular/forms';


export const routes: Routes = [
  { path: '', component: MisEvaluacionesComponent, pathMatch: 'full' },
  { path: 'EvaluarBecario', component: EvaluarComponent, pathMatch: 'full' },
  { path: 'EvaluacionFecha', component: EvaluacionFechaComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [MisEvaluacionesComponent,EvaluarComponent,EvaluacionFechaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule

  ]
})
export class MisEvaluacionesModule { }
