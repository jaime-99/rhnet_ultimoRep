import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';




@Component({
  selector: 'app-manual-de-usuario',
  templateUrl: './manual-de-usuario.component.html',
  styleUrls: ['./manual-de-usuario.component.scss']
})
export class ManualDeUsuarioComponent implements OnInit {

  constructor(    public router:Router,
    ) { }

  ngOnInit(): void {

    this.irDireccion();

  }


  irDireccion(){
    const urlExterna = 'https://www.dikeninternational.com/PDFS/Manual_de_usuario.pdf'; // Reemplaza con la URL externa a la que deseas redirigir
    window.location.href = urlExterna;
  }


}
