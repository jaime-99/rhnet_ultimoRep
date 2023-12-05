import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { Router } from '@angular/router';
import { DetallesBecarioComponent } from './detalles-becario/detalles-becario.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
  idBecario: any;



  constructor (private rhnetService:RhnetService, private router:Router, public dialog: MatDialog,
) {

  }
  ngOnInit(): void {
    this.getBecarios()


  }


  getBecarios(){
    this.rhnetService.getBecariosActivos().subscribe((res)=>{
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


  openDialog(id): void {
    const dialogRef = this.dialog.open(DetallesBecarioComponent, {
      data: {id:id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // al cerrar
    });
  }




  }




