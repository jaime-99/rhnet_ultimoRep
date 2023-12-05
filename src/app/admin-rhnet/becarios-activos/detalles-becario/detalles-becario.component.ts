import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-becario',
  templateUrl: './detalles-becario.component.html',
  styleUrls: ['./detalles-becario.component.scss'],
})
export class DetallesBecarioComponent implements OnInit {

  constructor (private rhnetService:RhnetService, @Inject(MAT_DIALOG_DATA) public data,
   public dialogRef: MatDialogRef<DetallesBecarioComponent> ) {

  }

  ngOnInit(): void {

    this.datosUsuario()


  }


  datosUsuario(){
    this.rhnetService.getDetalleID(this.data.id).subscribe((res)=>{
      console.log(res)
    })
  }

}
