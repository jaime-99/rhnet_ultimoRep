import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};
import { AdminRhnetComponent } from '../admin-rhnet/admin-rhnet.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RhMenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaseDigitalComponent } from './incidentes/pase-digital/pase-digital.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessagesComponent } from './components/messages/messages.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PasesAutorizadosComponent } from './pases-autorizados/pases-autorizados.component';
import { TodoLosPasesComponent } from './todo-los-pases/todo-los-pases.component';
import { AccesoGuard } from './guards/acceso.guard';
import { CrearSolicitudComponent } from './vacaciones/pages/crear-solicitud/crear-solicitud.component';
import { ReporteIncidenciasComponent } from './incidentes/reporteIncidencias/reporte-incidencias/reporte-incidencias.component';
import { RelojChecadorComponent } from './incidentes/reloj-checador/reloj-checador.component';
import { SolicitudesComponent } from './vacaciones/pages/VerSolicitudes/solicitudes/solicitudes.component';
import { AsistenciaPerfectaComponent } from './incidentes/asistencia-perfecta/asistencia-perfecta.component';
import { DetalleSolicitudComponent } from './solicitar-vecario/detalleSolicitud/detalleSolicitud.component';
import { ReservacionSalasModule } from './reservacionSalas/reservacion-salas.module';
import { ReservacionSalasComponent } from './reservacionSalas/reservacionSalas.component';

export const routes = [
  {
    path: '',
    component: AdminRhnetComponent, children: [
      // { path:'',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule)},
      { path:'',loadChildren:()=>import('./incidentes/pase-digital/pase-digital.module').then(m=>m.PaseDigitalModule)},


      { path:'PERFIL',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule),data: { breadcrumb: 'INICIO' } },
      { path:'PASE',loadChildren:()=>import('./incidentes/pase-digital/pase-digital.module').then(m=>m.PaseDigitalModule),data: { breadcrumb: 'PASE' }},
      { path:'MENSAJES',loadChildren:()=>import('./mensajes/mensajes.module').then(m=>m.MensajesModule),data: { breadcrumb: 'MENSAJES' }},
      { path:'PASES_AUTORIZADOS',loadChildren:()=>import('./pases-autorizados/pases-autorizados.module').then(m=>m.PasesAutorizadosModule),data: { breadcrumb: 'PASES AUTORIZADOS' },
      canActivate: [AccesoGuard] },
      { path:'PASES_GENERADOS',loadChildren:()=>import('./todo-los-pases/todo-los-pases.module').then(m=>m.TodoLosPasesModule),data: { breadcrumb: 'PASES GENERADOS' }},
      { path:'CREAR_SOLICITUD',loadChildren:()=>import('./vacaciones/pages/crear-solicitud/crear-solicitud.module').then(m=>m.CrearSolicitudModule),data: { breadcrumb: 'CREAR SOLICITUD' }},
      { path:'REPORTE_INCIDENCIAS',loadChildren:()=>import('./incidentes/reporteIncidencias/reporte-incidencias/reporte-incidencias.module').then(m=>m.ReporteIncidenciasModule),data: { breadcrumb: 'REPORTE INCIDENCIAS' }},
      { path:'RELOJ_CHECADOR',loadChildren:()=>import('./incidentes/reloj-checador/reloj-checador.module').then(m=>m.RelojChecadorModule),data: { breadcrumb: 'RELOJ CHECADOR' }},
      { path:'SOLICITUDES_VACACIONES',loadChildren:()=>import('./vacaciones/pages/VerSolicitudes/ver-solicitudes.module').then(m=>m.VerSolicitudesModule),data: { breadcrumb: 'SOLICITUDES VACACIONES ' }},
      { path:'ASISTENCIA PERFECTA',loadChildren:()=>import('./incidentes/asistencia-perfecta/asistencia-perfecta.module').then(m=>m.AsistenciaPerfectaModule),data: { breadcrumb: 'ASISTENCIA PERFECTA ' }},
      { path:'Solicitar_Becario',loadChildren:()=>import('./solicitar-vecario/vecario.module').then(m=>m.solicitarVecario),data: { breadcrumb: 'Solicitar Becario ' }},
      { path:'Aprobar_Becario',loadChildren:()=>import('./aprobarBecarioRH/aprobar-becario-rhmodule.module').then(m=>m.AprobarBecarioRHModuleModule),data: { breadcrumb: 'Aprobar Becario ' }},
      { path:'Alta_Becario',loadChildren:()=>import('./altaBecario/altaBecario.module').then(m=>m.altaBecarioModule),data: { breadcrumb: 'Alta Becario ' }},
      { path:'mis_Evaluaciones',loadChildren:()=>import('./misEvaluaciones/mis-evaluaciones.module').then(m=>m.MisEvaluacionesModule),data: { breadcrumb: 'Mis Evaluaciones ' }},
      { path:'becarios_activos',loadChildren:()=>import('./becarios-activos/becarios-activos.module').then(m=>m.becariosActivoModule),data: { breadcrumb: 'Becarios Activos ' }},
      { path:'empleados',loadChildren:()=>import('./Empleados/Empleados.module').then(m=>m.EmpleadosModule),data: { breadcrumb: 'Empleados ' }},
      { path:'reservaciones',loadChildren:()=>import('./reservacionSalas/reservacion-salas.module').then(m=>m.ReservacionSalasModule),data: { breadcrumb: 'Reservaciones ' }},
      // { path: 'detalle-solicitud', component: DetalleSolicitudComponent }


    ],

  }
];

@NgModule({
  declarations: [
    AdminRhnetComponent,
    BreadcrumbComponent,
    RhMenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    InicioComponent,
    // PaseDigitalComponent
    MessagesComponent,
    MensajesComponent,
    PasesAutorizadosComponent,
    TodoLosPasesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatBadgeModule,



  ]
})
export class AdminRhnetModule { }
