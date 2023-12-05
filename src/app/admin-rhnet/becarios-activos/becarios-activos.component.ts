import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-becarios-activos',
  templateUrl: './becarios-activos.component.html',
  styleUrls: ['./becarios-activos.component.scss'],
})
export class BecariosActivosComponent implements OnInit{
  becarios: [];
  public filtroNombre= ''
  becariosMostrados: number = 10; // Número inicial de becarios a mostrar
  cargandoBecarios: boolean = false; // Variable para realizar un seguimiento del estado de carga



  constructor (private rhnetService:RhnetService) {

  }

  ngOnInit(): void {
    this.getBecarios()


  }


  getBecarios(){
    this.rhnetService.getBecariosActivos().subscribe((res)=>{
      console.log(res)
      this.becarios = res
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


  }




