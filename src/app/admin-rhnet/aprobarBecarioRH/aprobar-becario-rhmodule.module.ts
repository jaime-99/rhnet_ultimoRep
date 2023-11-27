import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprobarBecarioRHComponent } from './aprobarBecarioRH.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


export const routes: Routes = [
  { path: '', component: AprobarBecarioRHComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AprobarBecarioRHComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ]
})
export class AprobarBecarioRHModuleModule { }
