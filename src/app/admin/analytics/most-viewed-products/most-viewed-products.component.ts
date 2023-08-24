import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-most-viewed-products',
  templateUrl: './most-viewed-products.component.html',
  styleUrls: ['./most-viewed-products.component.scss']
})
export class MostViewedProductsComponent implements OnInit {
  public data: any[];
  public meses =[];



public showLabels = true;
public gradient = false; // Desactiva el gradiente para gráfica de barras

public xAxisLabel = 'Meses'; // Etiqueta del eje X
public yAxisLabel = 'Ventas'; // Etiqueta del eje Y
public tooltipDisabled = false; // Activa los tooltips
public barPadding = 10; // Espaciado entre barras
public animations = true; // Activa las animaciones
public yScaleMax = 50; // Establece el valor máximo del eje Y

public colorScheme = {
  domain: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
};

  public anio = 0;

  constructor(public appService:AppService) { }

  ngOnInit(){
    // this.data = most_viewed_product;s;
    // this.data=[];
    this.obtenerMeses();

    this.anio = this.getCurrentYear();
    //console.log(this.anio)


  }

  public onSelect(event) {
    //console.log(event);
  }

  obtenerMeses(){

    this.appService.getObtenerTotalPorMes().subscribe(
      (res) => {
        //console.log(res);
        this.meses = res.map((user: any) => ({
          name: user.mes,
          value: user.Total
        }));

        // Asignar directamente a this.data para tener el formato adecuado
        this.data = this.meses;

        //console.log(this.meses); // Imprimir los datos preparados
      },
      (error) => {
        console.error('Error al obtener los meses', error);
      }
    );
  }


  public currentDate: Date = new Date(); //obtener la fecha y hora

  getCurrentYear():number{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return year;
  }




}
