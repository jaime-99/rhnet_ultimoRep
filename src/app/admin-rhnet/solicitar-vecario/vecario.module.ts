import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';



export const routes: Routes = [
  { path: '', component: AddComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,



  ]
})
export class solicitarVecario { }
