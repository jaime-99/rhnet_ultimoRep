import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';



@Component({
  selector: 'app-pases-autorizados',
  templateUrl: './pases-autorizados.component.html',
  styleUrls: ['./pases-autorizados.component.scss']
})
export class PasesAutorizadosComponent implements OnInit {

  pasesAutorizados = []
  alerta:boolean = false;

  constructor(private rhnetService: RhnetService ) { }

  ngOnInit(): void {

    this.getPasesAutorizados();

  }

  //son los pases que son han sido autorizados
  getPasesAutorizados(){

    this.rhnetService.getPasesAutorizados().subscribe((res => {
      this.pasesAutorizados = res;


    if(this.pasesAutorizados.length ===0){
      this.alerta = true
      return;
    }

      const fechaHoy = new Date(); // Obtener la fecha actual en JavaScript
      const fechaHoyFormatted = fechaHoy.toISOString().slice(0, 10); // Formatear la fecha actual como "YYYY-MM-DD"

      // Filtrar los datos con la fecha del día presente
      this.pasesAutorizados = this.pasesAutorizados.filter(pase => {
        return pase.Fecha === fechaHoyFormatted; // Supongo que la propiedad se llama "Fecha"
      });
      // Ahora this.pasesAutorizados contiene solo los pases con la fecha de hoy

    }));



  }

  recargar(){
    this.getPasesAutorizados();
  }

  descargarExcel(){

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pasesAutorizados);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pases Autorizados');

    // Guardar el archivo
    XLSX.writeFile(wb, 'pases_autorizados.xlsx');
  }

  descargarPDF(){

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
        <h1>Pase Digital</h1>
        <p>{{}}.</p>
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

  // Convierte el HTML a PDF y descárgalo
  html2pdf().from(contenidoHTML).set(opciones).save();
}






}
