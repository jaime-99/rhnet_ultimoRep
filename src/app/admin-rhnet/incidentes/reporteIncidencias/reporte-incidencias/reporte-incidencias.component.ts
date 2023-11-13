import { Component, OnInit } from '@angular/core';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.scss']
})
export class ReporteIncidenciasComponent implements OnInit {

 public incidenciasEmpleado: any
 page = 1; // Página actual
 count:any
 public counts = [12, 24, 36];
 incidenciasEncontradas:any[] = []

  itemsPerPage = 10; // C
  filtroTexto: any;
  texto: any;
  alerta: boolean;
  constructor(private rhService: RhnetService) { }

  ngOnInit(): void {
    this.count = this.counts[0];

    this.obtenerIncidenciasEmpleados();
  }


  obtenerIncidenciasEmpleados(){
   this.rhService.getIncidenciasEmpleados().subscribe((res)=>{
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
    empleado.NOMBRE.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
    this.texto = this.filtroTexto


    // console.log(this.filtroTexto)
    // console.log(this.incidenciasEncontradas)


  } else{

    this.incidenciasEncontradas = this.incidenciasEmpleado

  }

}



}
