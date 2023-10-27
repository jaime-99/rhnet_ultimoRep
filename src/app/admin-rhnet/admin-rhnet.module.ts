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

export const routes = [
  {
    path: '',
    component: AdminRhnetComponent, children: [
      { path:'',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule)},


      { path:'PERFIL',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule),data: { breadcrumb: 'INICIO' }},
      { path:'PASE',loadChildren:()=>import('./incidentes/pase-digital/pase-digital.module').then(m=>m.PaseDigitalModule),data: { breadcrumb: 'PASE' }},
      { path:'MENSAJES',loadChildren:()=>import('./mensajes/mensajes.module').then(m=>m.MensajesModule),data: { breadcrumb: 'MENSAJES' }},
      { path:'PASES_AUTORIZADOS',loadChildren:()=>import('./pases-autorizados/pases-autorizados.module').then(m=>m.PasesAutorizadosModule),data: { breadcrumb: 'PASES AUTORIZADOS' }},




    ]
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
    PasesAutorizadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatBadgeModule


  ]
})
export class AdminRhnetModule { }
