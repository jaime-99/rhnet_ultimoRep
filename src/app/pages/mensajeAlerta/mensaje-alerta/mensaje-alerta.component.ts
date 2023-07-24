import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-mensaje-alerta',
  templateUrl: './mensaje-alerta.component.html',
  styleUrls: ['./mensaje-alerta.component.scss']
})



export class MensajeAlertaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MensajeAlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
