import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../pase-digital/open-dialog/open-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {
  formulario: FormGroup;


  constructor(  @Inject(MAT_DIALOG_DATA) public data, private rhService:RhnetService, public snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogoComponent>
  ) { }



  ngOnInit(): void {

    this.formulario = new FormGroup({
      observaciones: new FormControl('', [Validators.required])
    });


  }


  justificar(id){

    const {observaciones} = this.formulario.value

    if (this.formulario.valid) {

      this.rhService.updateJustificado(id,observaciones).subscribe((res)=>{

        this.dialogRef.close();
      })

      this.snackBar.open('has justificado la falta', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    } else {

      this.snackBar.open('te falta llenar las observaciones', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    }
  }
  }


