import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TablaConsolidadoComponent } from '../../tablaDetalles/tabla-consolidado/tabla-consolidado.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos-consolidados',
  templateUrl: './pedidos-consolidados.component.html',
  styleUrls: ['./pedidos-consolidados.component.scss']
})


export class PedidosConsolidadosComponent implements OnInit {

  consolidados=[];
  consolidadoDetalles=1;
  numAdmin:number =0;
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, public appService: AppService) { }


  precio: number;
  codigoDiken: string;

  ngOnInit(): void {

    this.detallesConsolidado();

    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    console.log(userauth);






    // obtengo el id de solo los admin de ventaEmpelados
    this.appService.obtenerAdmin().subscribe((res)=>{

      //console.log(res)
    })

    // con esto obtengo los consolidados
      this.appService.obtenerConsolidados().subscribe((res)=>{

        this.consolidados = res.filter((consolidado) =>consolidado);

      console.log(res)
      console.log(this.consolidados);

    })

  }


 // obtener los detalles de consolidados
  detallesConsolidado(){

    this.appService.obtenerTablaJunta(1).subscribe((res)=>{

      this.consolidadoDetalles = res.filter((consolidadoD) =>consolidadoD);

      console.log(res)
    })

  }



  // openDialog() {
  //   const dialogRef = this.dialog.open(TablaConsolidadoComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }


  openDialog() {
    const data = [
      "ola soy jaime"
      // Agregar más datos aquí...
    ];

    this.dialog.open(TablaConsolidadoComponent, {
      data: data
    });
  }

  openDialog1() {
    this.appService.obtenerTablaJunta(1).subscribe((res) => {
      const data = res;
      const precio = data[0].Precio;
      const codigoDiken = data[0].CodigoDiken;
      const importe = data[0].Importe;
      const producto = data[0].Producto;
      const usu = data[0].Usuario;
      const cantidad = data[0].Cantidad;







      const detalleVenta = {
        precio: precio,
        codigoDiken: codigoDiken,
        importe:importe,
        producto:producto,
        usuario:usu,
        cantidad:cantidad

      };


      this.dialog.open(TablaConsolidadoComponent, {
        maxWidth: "900%",
        // maxHeight: "90%",
        // data: precio
        data: detalleVenta

      });
    });
  }








}
