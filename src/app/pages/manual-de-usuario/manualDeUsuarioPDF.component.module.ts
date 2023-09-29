import { NgModule } from '@angular/core';
import { ManualDeUsuarioComponent } from './manual-de-usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
// import { PdfViewerModule } from 'ngx-extended-pdf-viewer';



export const routes: Routes = [
  { path: '', component: ManualDeUsuarioComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],

  exports: [


  ],
  declarations: [ManualDeUsuarioComponent

  ],


  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]


})



export class ManualDeUsuarioModule { }

