import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MensajesComponent } from './mensajes.component';
import { SharedModule } from 'src/app/shared/shared.module';


export const routes: Routes = [
  { path: '', component: MensajesComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MensajesModule { }
