import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoLosPasesComponent } from './todo-los-pases.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


export const routes: Routes = [
  { path: '', component: TodoLosPasesComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TodoLosPasesModule { }
