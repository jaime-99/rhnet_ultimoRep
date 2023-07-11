import { RouterModule, Routes } from "@angular/router";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { formularioPass } from "./formularioPass.component";
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';





export const routes: Routes = [
  { path: '', component: formularioPass, pathMatch: 'full' }
];


@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,


  ],

  declarations: [
    formularioPass
  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class formularioPassModule {}
