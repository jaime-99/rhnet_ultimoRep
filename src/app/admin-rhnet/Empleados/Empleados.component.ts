import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { MatPaginator, PageEvent  } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-empleados',

  templateUrl: './Empleados.component.html',
  styleUrls: ['./Empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {




  empleados = [];
  public filtroNombre = ''
  empleadosInternational = [];

  @ViewChild('tabla') tabla: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML
  @ViewChild('tabla1') tabla1: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML
  @ViewChild('tabla3') tabla3: ElementRef; // Asegúrate de tener una referencia a tu tabla en el HTML


  public counts = [12, 24, 36];
  public page = 1;
  count: number; // pendiente , ver p
  itemsPerPageOptions = []
  dikenMexico  = [];
  institucional = [];

  get totalEmpleados(): number {
    return this.empleados.length;
  }
  get totalPages(): number {
    return Math.ceil(this.totalEmpleados / this.count);
  }

  get totalIntern(): number {
    return this.empleadosInternational.length;
  }
  get totalMexico(): number {
    return this.dikenMexico.length;
  }
  get totalIns(): number {
    return this.institucional.length;
  }

  // obtener el listado de pagina de totalEmpleados
  get firstItem(): number {
    return (this.page - 1) * this.count + 1;
  }

  get lastItem(): number {
    return Math.min(this.page * this.count, this.totalEmpleados);
  }
  get lastItem1(): number {
    return Math.min(this.page * this.count, this.totalIntern);
  }
  get lastItem2(): number {
    return Math.min(this.page * this.count, this.totalMexico);
  }
  get lastItem3(): number {
    return Math.min(this.page * this.count, this.totalIns);
  }





  constructor (private rhnet:RhnetService , private router:Router) {}

  ngOnInit(): void {

    this.count = this.counts[0];



    this.getEmpleados();
    // throw new Error('Method not implemented.');
  }



  getEmpleados(){

    this.rhnet.getEmpleados().subscribe((res)=>{
      this.empleados = res
      // console.log(this.empleados)
      this.getEmpleadosByEmpresa();
      this.getEmpleadosDiken();
      this.getEmpleadosIns();
    })

  }

  getEmpleadosByEmpresa(){
    this.rhnet.getEmpleadosByEmpresa('INTERNATIONAL').subscribe((res)=>{
      this.empleadosInternational = res
      // console.log(res)

    })
  }
  getEmpleadosDiken(){
    this.rhnet.getEmpleadosByEmpresa('DIKEN DE MEXICO').subscribe((res)=>{
      this.dikenMexico = res
    })
  }

  getEmpleadosIns(){
    this.rhnet.getEmpleadosByEmpresa('INSTITUCIONAL').subscribe((res)=>{
      this.institucional = res
    })
  }


  public onPageChanged(event){
    this.page = event;
    // this.count+=12
    }

    irADetalle(a){


      this.router.navigate(['rhnet/empleados/detalle', {id:a}])

    }
}
