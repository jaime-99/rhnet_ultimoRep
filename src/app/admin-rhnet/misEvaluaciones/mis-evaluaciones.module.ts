import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MisEvaluacionesComponent } from './misEvaluaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EvaluarComponent } from './evaluar/evaluar.component';

export const routes: Routes = [
  { path: '', component: MisEvaluacionesComponent, pathMatch: 'full' },
  { path: '', component: EvaluarComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [MisEvaluacionesComponent,EvaluarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class MisEvaluacionesModule { }
