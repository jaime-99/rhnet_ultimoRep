import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { Empleado } from '../interfaces/empleados';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bajas',

  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.scss'],
})
export class BajasComponent implements OnInit {
  empleadosBaja: Empleado[] = [];
  buscador:any
  count:number
  page:number = 1;
  counts =  [12,24]
  currentSortColumn: string = 'id'; // Columna inicial para ordenar
  isSortAsc: boolean = true;
  constructor (private rhnet:RhnetService, public location: Location, public router:Router ) {}

  ngOnInit(): void {

    this.count = this.counts[0];
    this.empeladosBaja()
  }

  get totalEmpleados(): number {
    return this.empleadosBaja.length;
  }
  get totalPages(): number {
    return Math.ceil(this.totalEmpleados / this.count);
  }
  get firstItem(): number {
    return (this.page - 1) * this.count + 1;
  }

  get lastItem(): number {
    return Math.min(this.page * this.count, this.totalEmpleados);
  }


  empeladosBaja(){

    this.rhnet.getEmpleadosBaja('NOMBRE').subscribe((res)=>{
      this.empleadosBaja = res
    })

  }

  onPageChanged(event){

    this.page = event
  }

  irDetalles(id,num:number=2){
    this.router.navigate(['/rhnet/empleados/detalle', {id:id, num:num}])
  }

  back(){
    this.location.back()
  }

  sortColumn(column){

    if (this.currentSortColumn === column) {
      // Si ya estamos ordenando por esta columna, cambia el estado de orden
      this.isSortAsc = !this.isSortAsc;
    } else {
      // Si es una nueva columna, establece la columna actual y el estado de orden ascendente
      this.currentSortColumn = column;
      this.isSortAsc = true;
    }

    // Lógica para ordenar el array empleadosBaja según la columna y el estado de orden
    this.empleadosBaja.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.isSortAsc ? -1 : 1;
      } else if (aValue > bValue) {
        return this.isSortAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }






  }



