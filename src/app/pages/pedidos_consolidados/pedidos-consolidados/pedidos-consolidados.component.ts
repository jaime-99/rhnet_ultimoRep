import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TablaConsolidadoComponent } from '../../tablaDetalles/tabla-consolidado/tabla-consolidado.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import * as Papa from 'papaparse';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup} from '@angular/forms';


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
  IdSeleccionado=0;
  UsuarioId: any;
  total: any;
  fecha: any;
  constructor(public dialog: MatDialog, public appService: AppService, public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar) { }

  consolidadoIds: number[] = []; // Arreglo para almacenar los IdConsolidadoVentaEmpleado


  private subscription: Subscription | undefined; // Almacena la suscripción

  precio: number;
  codigoDiken: string;
  openTable = false;

  numPedido: UntypedFormGroup;
  partidas=[];
  eliminado: boolean;



  ngOnInit(): void {

    this.numPedido = this.formBuilder.group({
      Pedido: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]

    });


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


    })

  }

  seleccionarConsolidado(consolidado: number) {
    this.selectedConsolidadoId = consolidado;
  }



 // obtener los detalles de consolidados


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

    if (this.IdSeleccionado === id) {
      this.openTable = !this.openTable;
    } else {
      this.IdSeleccionado = id;

      this.detalleVentasArray = [];
      this.openTable = true;

      if (this.openTable) {
        this.subscription = this.appService
          .obtenerTablaJunta(id)
          .subscribe((res) => {
            const data = res;
            for (const detalle of data) {
              const detalleVenta = {
                precio: detalle.Precio,
                codigoDiken: detalle.CodigoDiken,
                importe: detalle.Importe,
                producto: detalle.Producto,
                usuario: detalle.Usuario,
                cantidad: detalle.Cantidad,
                empleado: detalle.Numero_Empleado,
                ventaEmpleadoId:detalle.VentaEmpleadoId
              };

              // console.log(res);
              this.detalleVentasArray.push(detalleVenta);
              console.log(detalleVenta);// ver los detalles de cada fila
            }
          });
          // this.snackBar.open('Se muestran los detalles del consolidado Abajo!', '×', { panelClass: 'link', verticalPosition: 'top', duration: 5000 });

      }
    }
  }
  //   }else{
  //       if (this.subscription){
  //         this.subscription.unsubscribe();
  //   }


  // }
  // }

  // es para ocultar los detalles
  cerrarTabla(): void {
    this.openTable = false;
    this.IdSeleccionado = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //todo para eliminar cada detalle
  eliminarDetalleVenta(index: number): void {
    if (index >= 0 && index < this.detalleVentasArray.length) {
      const detalleEliminado = { ...this.detalleVentasArray[index] };
      this.detalleVentasArray[index].eliminado = true;
      this.partidas.push(detalleEliminado);
      console.log(this.partidas)
    }
  }


  //TODO boton para guardar la factura, guardar los que se eliminaron


  guardarFactura(){

    // const ventaEmpelado = {
    //   RhUsuarioId: this.UsuarioId,
    //   Total:this.total,
    //   Fecha:this.fecha,
    // }

    // Obtener todas las ventaEmpleadoId del arreglo partidas
  const ventaCanceladaIds = this.partidas.map((detalleEliminado) => detalleEliminado.ventaEmpleadoId);

  console.log(ventaCanceladaIds);



    this.appService.CerrarVenta(ventaCanceladaIds).subscribe((res) => {
      console.log(res)
    })


  }



  descargarcsv(IdConsolidadoVentaEmpleado)
  {

    this.appService.obtenerTablaJunta(IdConsolidadoVentaEmpleado).subscribe((res) => {

      const data=res;

    var csv = Papa.unparse(data, { encoding: "utf-8" });
    this.downloadCSV(csv, 'csvconsolidadoventaempleado' + IdConsolidadoVentaEmpleado + '.csv');
  });
  }

  private downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}







