import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertaComponent>) { }


  ngOnInit(): void {
  }



  onConfirm(): void {
    this.dialogRef.close(true);
  }


}
