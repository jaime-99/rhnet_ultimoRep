import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.scss']
})
export class ReporteIncidenciasComponent implements AfterViewInit  {

  @ViewChild('fechaInicioInput') fechaInicioInput!: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput!: ElementRef;

 public incidenciasEmpleado: any
 page = 1; // Página actual
 count:any
 public counts = [12, 24, 36];
 incidenciasEncontradas:any[] = []
 fechaActual: Date = new Date();
  itemsPerPage = 10; // C
  filtroTexto: any;
  texto: any;
  alerta: boolean;
  constructor(private rhService: RhnetService) { }

  ngAfterViewInit(): void {
    this.fechaDeHoy();
    this.count = this.counts[0];

    const fechaInicioValue = this.fechaInicioInput.nativeElement.value;
    const fechaFinValue = this.fechaFinInput.nativeElement.value;


    this.obtenerIncidenciasEmpleados(fechaInicioValue, fechaFinValue);


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
  console.log('Fecha actual:', this.fechaActual);

}



}
