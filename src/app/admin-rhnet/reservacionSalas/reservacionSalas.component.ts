import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-reservacion-salas',
  templateUrl: './reservacionSalas.component.html',
  styleUrls: ['./reservacionSalas.component.scss'],
})
export class ReservacionSalasComponent implements OnInit {
  reservaciones: any[] = [];

  page:number = 1;
  counts =  [12,24]
  count: number;



  currentSortColumn: string = ''; // Columna inicial para ordenar
  isSortAsc: boolean = true;

  constructor (private rhnet:RhnetService) {}

  ngOnInit(): void {

    this.count = this.counts[0];
    this.getJuntas()
  }

  get totalJuntas(): number {
    return this.reservaciones.length;
  }
  get totalPages(): number {
    return Math.ceil(this.totalJuntas / this.count);
  }
  get firstItem(): number {
    return (this.page - 1) * this.count + 1;
  }
  get lastItem(): number {
    return Math.min(this.page * this.count, this.totalJuntas);
  }

  getJuntas(){

    this.rhnet.getJuntas().subscribe((res)=>{
      this.reservaciones = res
      console.log(res)
    })
  }

  onPageChanged(event){
    this.page = event
  }


  sortColumn(column){

    if (this.currentSortColumn === column) {
      this.isSortAsc = !this.isSortAsc;

    }else{
      this.currentSortColumn = column;
      this.isSortAsc = true;
    }

    this.reservaciones.sort((a, b) => {
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


  descargarPDF(motivo,fecha,hora1,hora2,sala){

    const datos = [];
    datos.push(motivo,fecha,hora1,hora2,sala);


  }


}

