import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { daily_views_stats } from '../analytics.data';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-daily-views-stats',
  templateUrl: './daily-views-stats.component.html',
  styleUrls: ['./daily-views-stats.component.scss']
})
export class DailyViewsStatsComponent implements OnInit {
  public data=[];
  public categorias =[];

  //todo nuevo

  public showLabels = true;
public gradient = false; // Desactiva el gradiente para gráfica de barras

public xAxisLabel = 'Categorias'; // Etiqueta del eje X
public yAxisLabel = 'Ventas'; // Etiqueta del eje Y
public tooltipDisabled = false; // Activa los tooltips
public barPadding = 10; // Espaciado entre barras
public animations = true; // Activa las animaciones
public yScaleMax = 50; // Establece el valor máximo del eje Y



  constructor(public appService:AppService) { }

  ngOnInit(){
    this.data =[]
    this.obtenerCategorias();

  }

  onSelect(event) {
    //console.log(event);
  }

  //esto es para obtener las categorias mas populares
  obtenerCategorias(): void {
    this.appService.getObtenerCategoria().subscribe(
      (res) => {
        //console.log(res);
        this.categorias = res.map((user: any) => ({
          name: user.Familia,
          value: user.CantidadComprada
        }));

        // Asignar directamente a this.data para tener el formato adecuado
        this.data = this.categorias;

        //console.log(this.categorias); // Imprimir los datos preparados
      },
      (error) => {
        console.error('Error al obtener Categorias', error);
      }
    );
  }

}
