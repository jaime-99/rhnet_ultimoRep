import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.scss']
})
export class ReporteIncidenciasComponent implements AfterViewInit  {

  @ViewChild('fechaInicioInput') fechaInicioInput!: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput!: ElementRef;

  @ViewChild('tabla') tabla: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML
  @ViewChild('input') input: any;


 public incidenciasEmpleado: any
 page = 1; // Página actual
 count:any
 public counts = [12, 24, 36];
 incidenciasEncontradas:any[] = []
 fechaActual: Date = new Date();
  itemsPerPage = 10; // C
  filtroTexto: any;
  texto: any;
  alerta: boolean = false;
  constructor(private rhService: RhnetService, private mat:MatSnackBar,  private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.fechaDeHoy();
    this.count = this.counts[0];

    const fechaInicioValue = this.fechaInicioInput.nativeElement.value;
    const fechaFinValue = this.fechaFinInput.nativeElement.value;


    this.obtenerIncidenciasEmpleados(fechaInicioValue, fechaFinValue);


    this.cdr.detectChanges();




    // this.obtenerIncidenciasEmpleados();
  }

// es para que automaticamente se coloquen los de hoy
  obtenerIncidenciasEmpleados(fechaInicio: string, fechaFin: string){

    const fechaInicioValue = this.fechaInicioInput.nativeElement.value;
    const fechaFinValue = this.fechaFinInput.nativeElement.value;

   this.rhService.getIncidenciasEmpleados(fechaInicio,fechaFin).subscribe((res)=>{
    this.incidenciasEmpleado = res
    this.buscarIncidencias();
   })

}

obtenerPorFecha(){
  const fechaInicioValue = this.fechaInicioInput.nativeElement.value;
    const fechaFinValue = this.fechaFinInput.nativeElement.value;

   this.rhService.getIncidenciasEmpleados(fechaInicioValue,fechaFinValue).subscribe((res)=>{
    this.incidenciasEmpleado = res
    this.buscarIncidencias();
   })



}

//para pagination
public onPageChanged(event){
  this.page = event;
}

// es para buscar incidencias de los empleados
buscarIncidencias(){
  if(this.filtroTexto){
    this.incidenciasEncontradas = this.incidenciasEmpleado.filter((empleado) =>
    empleado.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
    this.texto = this.filtroTexto


    // console.log(this.filtroTexto)
    // console.log(this.incidenciasEncontradas)


  } else{

    this.incidenciasEncontradas = this.incidenciasEmpleado

  }

}

fechaDeHoy(){

  this.fechaActual = new Date();
}

exportarAExcel(): void {
  const content: HTMLElement = this.tabla.nativeElement;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(content);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');

  this.mat.open('SE DESCARGO EN EXCEL', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

}


buscarIncidencias2() {
  const filtroTexto = this.input.nativeElement.value.toLowerCase();

  if (filtroTexto) {
    this.incidenciasEncontradas = this.incidenciasEmpleado.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(filtroTexto)
    );
    this.texto = filtroTexto;
  } else {
    this.incidenciasEncontradas = this.incidenciasEmpleado;

  }

  this.alerta = this.incidenciasEncontradas.length === 0;

}

}
