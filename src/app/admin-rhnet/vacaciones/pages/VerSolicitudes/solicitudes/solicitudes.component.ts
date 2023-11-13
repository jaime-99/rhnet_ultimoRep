import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/admin-rhnet/person-service.service';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  solicitudesRH: any[] = [];
  @ViewChild('tabla') tabla: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML


  constructor(private personService:PersonService, private rhService:RhnetService, private mat:MatSnackBar) { }

  listaSolicitudes

  ngOnInit(): void {
    this.verSolicitudesRH();

  }


  verSolicitudesRH(){
    this.rhService.getSolicitudesRH().subscribe((res)=>{
      this.solicitudesRH = res})
  }



  exportarAPDF(): void {
    const content: HTMLElement = this.tabla.nativeElement;

    html2canvas(content).then(canvas => {
      const pdf = new jspdf.jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Ancho de la página en mm (A4 en este caso)
      const pageHeight = 295; // Altura de la página en mm (A4 en este caso)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('tabla.pdf');
    });
    this.mat.open('SE DESCARGO EN PDF', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });


  }

  exportarAExcel(): void {
    const content: HTMLElement = this.tabla.nativeElement;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(content);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'tabla.xlsx');

    this.mat.open('SE DESCARGO EN EXCEL', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

  }

  aprobadaRH(){

  }

}
