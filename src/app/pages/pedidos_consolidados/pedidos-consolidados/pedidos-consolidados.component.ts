import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TablaConsolidadoComponent } from '../../tablaDetalles/tabla-consolidado/tabla-consolidado.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidos-consolidados',
  templateUrl: './pedidos-consolidados.component.html',
  styleUrls: ['./pedidos-consolidados.component.scss']
})


export class PedidosConsolidadosComponent implements OnInit {
  selectedConsolidadoId: number | null = null; // Variable para almacenar el IdConsolidadoVentaEmpleado seleccionado

  consolidados=[];
  consolidadoDetalles=1;
  numAdmin:number =0;
  dataSource: MatTableDataSource<any>;
  detalleVentasArray=[];
  constructor(public dialog: MatDialog, public appService: AppService) { }

  consolidadoIds: number[] = []; // Arreglo para almacenar los IdConsolidadoVentaEmpleado


  private subscription: Subscription | undefined; // Almacena la suscripción

  precio: number;
  codigoDiken: string;
  openTable = false;

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
        // obtener los id's
        this.consolidadoIds = this.consolidados.map((consolidado) => consolidado.IdConsolidadoVentaEmpleado);




      console.log(res)
      console.log(this.consolidados);
      console.log(this.consolidadoIds)

    })

  }

  seleccionarConsolidado(consolidado: number) {
    this.selectedConsolidadoId = consolidado;
  }



 // obtener los detalles de consolidados
  detallesConsolidado(){

    this.appService.obtenerTablaJunta(1).subscribe((res)=>{

      this.consolidadoDetalles = res.filter((consolidadoD) =>consolidadoD);

      console.log(res)
    })

  }

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
    // el uno es el parametro que se pasara, hay que cambiarlo para obtener el id de consolidado al darle click a detalles
    this.appService.obtenerTablaJunta(1).subscribe((res) => {
      const data = res;
      const precio = data[2].Precio;
      const codigoDiken = data[2].CodigoDiken;
      const importe = data[2].Importe;
      const producto = data[2].Producto;
      const usu = data[2].Usuario;
      const cantidad = data[2].Cantidad;
      const empleado = data[2].Numero_Empleado;


      const detalleVenta = {
        precio: precio,
        codigoDiken: codigoDiken,
        importe:importe,
        producto:producto,
        usuario:usu,
        cantidad:cantidad,
        empleado:empleado
      };


      this.dialog.open(TablaConsolidadoComponent, {
        maxWidth: "90%",
        maxHeight: "90%",
        data: detalleVenta

      });
    });
  }





  abrirTabla(id):void{
    // se abrira la tabla al seleccionar detalles

    this.openTable = !this.openTable;

    id=id;


    this.detalleVentasArray = [];

    if(this.openTable){

   this.subscription= this.appService.obtenerTablaJunta(id).subscribe((res) => {


    const data=res;
    for (const detalle of data) {
      const detalleVenta = {
        precio: detalle.Precio,
        codigoDiken: detalle.CodigoDiken,
        importe: detalle.Importe,
        producto: detalle.Producto,
        usuario: detalle.Usuario,
        cantidad: detalle.Cantidad,
        empleado: detalle.Numero_Empleado,
      };



      this.detalleVentasArray.push(detalleVenta);
    }
  });


    }else{
        if (this.subscription){
          this.subscription.unsubscribe();
    }


  }
  }


}




