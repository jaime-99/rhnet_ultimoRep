import { Component, OnInit,ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';




@Component({
  selector: 'app-manual-de-usuario',
  templateUrl: './manual-de-usuario.component.html',
  styleUrls: ['./manual-de-usuario.component.scss']
})
export class ManualDeUsuarioComponent implements OnInit {
  pdfUrl:any=''

  constructor(    public router:Router, private sanitizer: DomSanitizer
    ) {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/Manual.pdf');

    }

  ngOnInit(): void {

    // this.irDireccion();


  }


  irDireccion(){
    const urlExterna = 'https://www.dikeninternational.com/PDFS/Manual_de_usuario.pdf'; // Reemplaza con la URL externa a la que deseas redirigir
    window.location.href = urlExterna;
  }

  // pdfUrl: string = '/assets/Manual.pdf'; // Ruta al archivo PDF en tu aplicación



}
