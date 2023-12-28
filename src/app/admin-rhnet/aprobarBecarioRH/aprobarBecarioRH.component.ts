import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprobar-becario-rh',
  templateUrl: './aprobarBecarioRH.component.html',
  styleUrls: ['./aprobarBecarioRH.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default ,
})
export class AprobarBecarioRHComponent implements OnInit {
  aceptadosRH:any;

  constructor (private RhnetService:RhnetService , private router:Router) {  }

  ngOnInit(): void {

    this.aceptados();
  }

  aceptados(){

  this.RhnetService.getPorAceptar().subscribe((res)=>{
    this.aceptadosRH = res
    console.log(res)
    })

  }

  irDetalles(id){

    this.router.navigate(['rhnet/Aprobar_Becario/detalles'], {
      queryParams: { id: id }
    });
  }





}
