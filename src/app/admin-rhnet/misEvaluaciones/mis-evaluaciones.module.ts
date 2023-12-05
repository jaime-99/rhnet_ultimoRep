import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MisEvaluacionesComponent } from './misEvaluaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EvaluacionFechaComponent } from './evaluacionFecha/evaluacionFecha.component';
import { FormsModule } from '@angular/forms';
import { VerEvaluacionCompletadaComponent } from './verEvaluacionCompletada/verEvaluacionCompletada.component';


export const routes: Routes = [
  { path: '', component: MisEvaluacionesComponent, pathMatch: 'full' },
  { path: 'EvaluarBecario', component: EvaluarComponent, pathMatch: 'full' ,data: { breadcrumb: 'Evaluar' } },
  { path: 'EvaluacionFecha', component: EvaluacionFechaComponent, pathMatch: 'full',data: { breadcrumb: 'Evaluaciones' } },
  { path: 'EvaluacionDetalle', component: VerEvaluacionCompletadaComponent, pathMatch: 'full',data: { breadcrumb: 'Evaluacion Hecha' } },

];



@NgModule({
  declarations: [MisEvaluacionesComponent,EvaluarComponent,EvaluacionFechaComponent,VerEvaluacionCompletadaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule

  ]
})
export class MisEvaluacionesModule { }
