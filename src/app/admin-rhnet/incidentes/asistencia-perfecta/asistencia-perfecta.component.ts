import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-asistencia-perfecta',
  templateUrl: './asistencia-perfecta.component.html',
  styleUrls: ['./asistencia-perfecta.component.scss']
})
export class AsistenciaPerfectaComponent implements OnInit {
  asistencia: any;

  fechas:FormGroup
  fechaDeHoy:string = ''

  @ViewChild('tabla') tabla: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML

  constructor(private rhService:RhnetService) { }

  ngOnInit(): void {

    this.fechas = new FormGroup({
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    });


    this.fechaHoy();


  }

  public asistenciaPerfecta(value:object){

    const {fechaInicio,fechaFin} = this.fechas.value

    const fechaInicio2 = fechaInicio
    const fechaFin2 = fechaFin

    if(this.fechas.valid){


      this.rhService.getAsistenciaPerfecta(fechaInicio,fechaFin,fechaInicio2,fechaFin2).subscribe((res)=>{
        this.asistencia = res

      })

    }else{

    }


}


fechaHoy(){

const fechaHoy: Date = new Date();
const fechaSinHora: Date = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), fechaHoy.getDate());

console.log(fechaSinHora);


this.fechas.setValue({
  fechaInicio: fechaSinHora.toISOString().split('T')[0],
  fechaFin: fechaSinHora.toISOString().split('T')[0]
});


}


exportarAExcel(): void {
  const content: HTMLElement = this.tabla.nativeElement;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(content);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');

  // this.mat.open('SE DESCARGO EN EXCEL', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

}


}
