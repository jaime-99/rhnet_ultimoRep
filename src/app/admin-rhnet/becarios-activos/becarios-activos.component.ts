import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { Router } from '@angular/router';
import { DetallesBecarioComponent } from './detalles-becario/detalles-becario.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { Becarios } from './interfaces/becarios';
import * as html2pdf from 'html2pdf.js';




@Component({
  selector: 'app-becarios-activos',
  templateUrl: './becarios-activos.component.html',
  styleUrls: ['./becarios-activos.component.scss'],
})
export class BecariosActivosComponent implements OnInit{
  becarios:Becarios [];
  public filtroNombre= ''
  becariosMostrados: number = 10; // Número inicial de becarios a mostrar
  cargandoBecarios: boolean = false; // Variable para realizar un seguimiento del estado de carga
  idBecario: any;
  pantalla: boolean = false;



  constructor (private rhnetService:RhnetService, private router:Router, public dialog: MatDialog,
) {

  }
  ngOnInit(): void {
    this.getBecarios()


  }




  getBecarios(){
    this.rhnetService.getBecariosActivos().subscribe((res)=>{
      this.becarios = res
      // console.log(res)
    })
  }

  cargarMasBecarios() {
    // this.becariosMostrados += 10; // Aumenta la cantidad de becarios a mostrar

    this.cargandoBecarios = true;
    setTimeout(() => {
      this.becariosMostrados += 10; // Aumenta la cantidad de becarios a mostrar
      this.cargandoBecarios = false;
    }, 1000); // Tiempo simulado de carga, ajusta según tus necesidades
  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(DetallesBecarioComponent, {
      data: {id:id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // al cerrar
    });
  }


  descargarExcel() { //todo falta colocarle solo mas info
    const datosExcel = this.becarios.map(becario => {
      return {
        Nombre: becario.nombre,
        Universidad : becario.universidad,
        Carrera: becario.carrera,
        fecha_ingreso : becario.fec_ingreso
        // Agrega más propiedades según tu estructura de objetos becarios
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Becarios');

    const nombreArchivo = 'becarios.xlsx';
    XLSX.writeFile(wb, nombreArchivo);
  }

  descargarPDF(){ //todo falta colocarle solo mas info

  // this.pantalla = true;
  // const element = document.getElementById('contenido');
  // const options = {
  //   filename:   `becarios_lista`,  // Cambia 'nombre_del_archivo' al nombre que desees
  // };
  // html2pdf(element,options).then(() => {
  //   this.pantalla = false;
  // });

  const listaBecarios = this.becarios.map(becario => `<li>${becario.nombre}</li>`).join('');


  const contenidoHTML = `
    <html>
      <head>
        <!-- Puedes agregar estilos y encabezados aquí -->
        <style>
          body { font-family: 'Arial, sans-serif'; }
        </style>
      </head>
      <body>
        <!-- Contenido de tu documento HTML -->
        <h1>Becarios Activos</h1>
          <ul>
            ${listaBecarios}
          </ul>
      </body>
    </html>
  `;

  // Configura las opciones de html2pdf
  const opciones = {
    margin: 10,
    filename: 'documento.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(contenidoHTML).set(opciones).save();





  }




  }




