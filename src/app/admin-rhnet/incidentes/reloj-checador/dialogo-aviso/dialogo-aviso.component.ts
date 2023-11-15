import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';



@Component({
  selector: 'app-dialogo-aviso',
  templateUrl: './dialogo-aviso.component.html',
  styleUrls: ['./dialogo-aviso.component.scss']
})
export class DialogoAvisoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<DialogoAvisoComponent>, private rhService:RhnetService,
  public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    console.log(this.data.id)


  }


  noJustificar(){

    this.rhService.updatenoJustificado(this.data.id).subscribe((res)=>{

      this.snackBar.open('HECHO', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

      this.dialogRef.close();


    })



  }

}
