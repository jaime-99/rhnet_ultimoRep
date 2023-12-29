import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit, ElementRef } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';


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

  public filtroNombre = ''




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
      // console.log(res)
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


  descargarPDF(usuario,motivo,fecha,hora1,hora2,sala,descripcion){

    // const datos = [];
    // datos.push(usuario,motivo,fecha,hora1,hora2,sala);
    let data = {
      usuario:usuario,
      motivo:motivo,
      fecha:fecha,
      hora1:hora1,
      hora2:hora2,
      sala:sala,
      descripcion:descripcion
    }




    const contenidoHTML = `
    <html>
      <head>
        <!-- Puedes agregar estilos y encabezados aquí -->
        <style>
        </style>
      </head>
      <body>
        <!-- Contenido de tu documento HTML -->
        <p>Acuse de reservacion - sala de ${data.sala}</p>
        <p>RH Net - Recursos Humanos - Sistemas </p>
        <a>http://www.rhnet.dikeninternational.com/</a>
        <div class="container text-center">
          <div class="row">
              <div class="col alert alert-secondary">
              Solicita
              </div>
              <div class="col alert alert-secondary">
              Motivo
              </div>
          </div>
          <div class="row align-items-start ">
          <div class="col">
          <p>${data.usuario}</p>
          </div>
          <div class="col">
          <p>${data.motivo}</p>
          </div>
          </div>
          <div class="row ">
          <div class="col-6 alert alert-secondary">
          Dia
          </div>
          <div class="col-6 alert alert-secondary">
          Horario
          </div>
          </div>
          <div class="row align-items-start">
          <div class="col">
          <p> ${data.fecha} </p>
          </div>
          <div class="col">
          <p> ${data.hora1} - ${data.hora2}</p>
          </div>
          </div>
          <div class="row">
          <div class="col-12 alert alert-danger">
          Observaciones
          </div>
          </div>
          <div class="row align-items-start">
          <div class="col-12">
          <p>${data.descripcion}</p>
          </div>
          </div>
          <div class="row">
          <div class="col-12 alert alert-warning">
          <h3>Reglramento en el uso de la sala de ${data.sala}</h3>
          </div>
          </div>
          <div className="row">
          <div className="col">

          <ul class="list-unstyled text-start">
          <li>Respetar el horario apartado</li>
          <li>Apagar las luces al salir</li>
          <li>Apagar todos los equipos que se utilizaron</li>
          <li>Si se movió inmobiliario regresarlo a su lugar original</li>
          <li>Colocar la basura en el cesto</li>
          <li>Reportar cualquier percance que se haya suscitado</li>
          </ul>

          </div>
          </div>

        </div>

      </body>
    </html>
  `;

  const opciones = {
    margin: 10,
    filename: `reservacion de ${data.usuario}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(contenidoHTML).set(opciones).save();
  }

  // para descargar todo el contenido del arreglo de reservaciones
  descargarAllPdf(){

    const data = this.reservaciones.map(reservacion => {
      return `<tr>
                <td>${reservacion.fecha}</td>
                <td>${reservacion.usuario}</td>
                <td>${reservacion.descripcion}</td>
                <td>${reservacion.sala}</td>
                <td>${reservacion.hora1}</td>
                <td>${reservacion.hora2}</td>

              </tr>`;
    }).join('');
    const html = `<table border="1">
                    <thead>
                      <tr>
                        <th>fecha</th>
                        <th>usuario </th>
                        <th>descripcion</th>
                        <th>sala</th>
                        <th>horas</th>

                      </tr>
                    </thead>
                    <tbody>
                      ${data}
                    </tbody>
                  </table>`;

    const options = {
      margin: 10,
      filename: 'reservaciones.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(html).set(options).save();
  }

  descargarExcel(){
    const data = this.reservaciones.map(reservacion => {
      return [
        reservacion.fecha,
        reservacion.usuario,
        reservacion.descripcion,
        reservacion.sala,
        reservacion.hora1,
        reservacion.hora2
      ];
    });

    // Agregar encabezados
    const headers = ['Fecha', 'Usuario', 'Descripción', 'Sala', 'Hora 1', 'Hora 2'];
    data.unshift(headers);

    // Crear un objeto worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Crear un objeto workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reservaciones');

    // Convertir el workbook a un archivo Excel binario
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Crear un Blob para el archivo Excel
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Crear un enlace de descarga y simular un clic
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reservaciones.xlsx';
    link.click();
  }







}

