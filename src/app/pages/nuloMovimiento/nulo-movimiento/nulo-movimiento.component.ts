import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-nulo-movimiento',
  templateUrl: './nulo-movimiento.component.html',
  styleUrls: ['./nulo-movimiento.component.scss']
})
export class NuloMovimientoComponent implements OnInit {
  movimientosNulos: any;
  dataSource: any;

  displayedColumns: string[] = ['Numero','Producto', 'Nombre', 'Cantidad', 'Precio', 'Importe',];



  constructor(public appService:AppService) { }

  ngOnInit(): void {

    this.getMovimientosNulos();

  }

  getMovimientosNulos(){

    this.appService.getMovimientosNulos().subscribe((res)=>{
      // console.log(res)
      this.movimientosNulos = res;

      this.dataSource = this.movimientosNulos;

    })

  }

}
