import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-becario',
  templateUrl: './detalles-becario.component.html',
  styleUrls: ['./detalles-becario.component.scss'],
})
export class DetallesBecarioComponent implements OnInit {
  info: any;
  comentariosE: any;
  idBecario: number;
  fecha:string;

  constructor (private rhnetService:RhnetService, @Inject(MAT_DIALOG_DATA) public data,
   public dialogRef: MatDialogRef<DetallesBecarioComponent>, public router:Router ) {

  }

  ngOnInit(): void {

    this.datosUsuario()
  }


  datosUsuario(){
    this.rhnetService.getBecariosPorId(this.data.id).subscribe((res)=>{
      this.info = res
      this.observaciones()
      console.log(this.info)
      this.idBecario = this.info.id
      // console.log(this.idBecario)
    })
  }

  observaciones(){
    this.rhnetService.getObservaciones(this.data.id).subscribe((res)=>{
      this.comentariosE = res
      // console.log("observaciones",res)
    })
  }


  verEvaluaciones(tipo){

    this.router.navigate(['./rhnet/mis_Evaluaciones/EvaluacionDetalle', {id:this.idBecario, tipo:tipo} ]   )


  }

}
