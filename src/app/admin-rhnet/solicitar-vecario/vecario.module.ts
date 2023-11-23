import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';
import { DialogoVecarioComponent } from './openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DetalleSolicitudComponent } from './detalleSolicitud/detalleSolicitud.component';



export const routes: Routes = [
  { path: '', component: AddComponent, pathMatch: 'full' },
  {path: 'detalle-solicitud', component: DetalleSolicitudComponent }

];


@NgModule({
  declarations: [AddComponent,DialogoVecarioComponent,DetalleSolicitudComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule




  ]
})
export class solicitarVecario { }
