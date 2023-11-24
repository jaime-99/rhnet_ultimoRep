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
import { ComentariosDialogComponent } from './comentariosDialog/comentariosDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { VerMasComponent } from './verMas../verMas...component';



export const routes: Routes = [
  { path: '', component: AddComponent, pathMatch: 'full' },
  {path: 'detalle-solicitud', component: DetalleSolicitudComponent,data: { breadcrumb: 'Detalle Solicitud ' } },
  {path: 'Ver-mas', component: VerMasComponent,data: { breadcrumb: 'VerMas ' } }

];


@NgModule({
  declarations: [AddComponent,DialogoVecarioComponent,DetalleSolicitudComponent,ComentariosDialogComponent,VerMasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule ,
    MatTabsModule





  ]
})
export class solicitarVecario { }
