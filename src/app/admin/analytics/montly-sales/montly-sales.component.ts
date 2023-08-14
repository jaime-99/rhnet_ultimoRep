import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { montly_sales } from '../analytics.data';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-montly-sales',
  templateUrl: './montly-sales.component.html',
  styleUrls: ['./montly-sales.component.scss']
})
export class MontlySalesComponent implements OnInit {
  public data: any[];
  // public showLegend = false;
  // public gradient = true;
  // public colorScheme = {
  //   domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  // };
  // public showLabels = true;
  // public explodeSlices = false;
  // public doughnut = false;
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0;
  productos:any[] =[];

  public showLabels = true;
public gradient = false; // Desactiva el gradiente para gráfica de barras
public colorScheme = {
  domain: ['#2F3E9E', '#D22E2E', '#378D3B']
};
public xAxisLabel = 'Productos'; // Etiqueta del eje X
public yAxisLabel = 'Ventas'; // Etiqueta del eje Y
public tooltipDisabled = false; // Activa los tooltips
public barPadding = 10; // Espaciado entre barras
public animations = true; // Activa las animaciones
public yScaleMax = 50; // Establece el valor máximo del eje Y






  constructor(public appService:AppService) { }

  ngOnInit(){
    this.data = montly_sales;
    this.obtenerProductos()

  }

  public onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.data = [...this.productos] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

  //para obtener los productos mas populares

  obtenerProductos(): void {
    this.appService.getObtenerProductos().subscribe(
      (res) => {
        console.log(res);
        this.productos = res.map((user: any) => ({
          name: user.NombreProducto,
          value: user.Repeticiones
        }));

        // Asignar directamente a this.data para tener el formato adecuado
        this.data = this.productos;

        console.log(this.productos); // Imprimir los datos preparados
      },
      (error) => {
        console.error('Error al obtener Productos', error);
      }
    );
  }



  formatLabel(data: any): string {
    // Formatea la etiqueta para mostrar el nombre y el valor
    return `${data.data.name}: ${data.data.value}`;
  }

  formatTooltip(data: any): string {
    // Formatea el tooltip para mostrar el nombre y el valor
    return `${data.name}: ${data.value}`;
  }



}
