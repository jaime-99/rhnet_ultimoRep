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
import { mergeMap } from 'rxjs/operators';


import { FormGroup} from '@angular/forms';
import { Venn } from '@amcharts/amcharts5/.internal/charts/venn/Venn';
import { dA } from '@fullcalendar/core/internal-common';


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
  ventasEmpleado: any[];
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
      Pedido: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(4)]]

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

        console.log(res); // para ver los consolidados
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
                ventaEmpleadoId:detalle.VentaEmpleadoId,
                rhUsuarioId:detalle.RhUsuarioId,
                correo:detalle.Correo, // agregar correo

                //detalles

                ventaDetalle:detalle.ventaEmpleadoDetalleId,
                productoId:detalle.ProductoId



              };

              // console.log(res);
              this.detalleVentasArray.push(detalleVenta);
              console.log(detalleVenta);// ver los detalles de cada fila
            }
          });
          this.snackBar.open('Se muestran los detalles del consolidado Abajo!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 8000 });

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
      console.log(this.partidas);
      //empezare a ir a cada dato
      const eliminado = detalleEliminado.cantidad; // Cambia esto por el valor específico que deseas // accedo a el valor
      console.log(eliminado); // esto te muestra el eliminado en vivo
      const rhUsuarioId = detalleEliminado.rhUsuarioId; console.log(rhUsuarioId)
      const fecha = this.getCurrentDate();
      const Total = detalleEliminado.precio;
      console.log(Total);
      const VentaDetalleId = detalleEliminado.ventaDetalle;
      console.log(VentaDetalleId);
      const ventaEmpleadoId = detalleEliminado.ventaEmpleadoId;
      console.log(ventaEmpleadoId);
      const correo = detalleEliminado.correo;
      console.log(correo);


       // Llamar a la función para enviar la ventaEmpleado


      //  this.partidas.forEach(detalleEliminado =>  {
      //   console.log(detalleEliminado)

      //   const ventaEmpleado = {  // todo de la 215 a la 226 es posible solucion para mandar varios conjuntos a la vez
      //     RhUsuarioId: detalleEliminado.rhUsuarioId,
      //     Fecha: detalleEliminado.fecha,
      //     Total: detalleEliminado.total,
      //   }
      //   console.log(ventaEmpleado);

      // })



      //todo enviar solo 1 conjunto a la vez
      const ventaEmpleado = {
        RhUsuarioId : rhUsuarioId,
        Fecha : fecha,
        Total : Total,
      }
      console.log(ventaEmpleado)
      const detalles = [{
        ProductoId: detalleEliminado.productoId,
        Precio: detalleEliminado.precio,
        Cantidad :detalleEliminado.cantidad,
        Importe:detalleEliminado.importe,
        CodigoDiken:detalleEliminado.codigoDiken,

      }]
      console.log(detalles);
      //!es para enviar un nuevo ventaEmpleado
      this.appService.sinDetalles(ventaEmpleado,detalles).subscribe((res)=>{
        console.log(res)
      })

      //todo enviar varios conjuntos a la vez
//       const conjuntosVentaEmpleado = [
//         {
//           RhUsuarioId: rhUsuarioId,
//           Fecha: fecha,
//           Total: Total,
//         },
//         {
//           RhUsuarioId: 12,
//           Fecha: fecha,
//           Total:12,
//         },
//       ];
//       conjuntosVentaEmpleado.forEach(conjunto => {
//         this.appService.sinDetalles(conjunto).subscribe((res) => {
//         console.log(res);
//   });
// });




//todo Eliminar Detalle
this.appService.EliminaDetalles(VentaDetalleId).pipe(
  mergeMap(() => {
    // Después de eliminar, actualiza el total de ventaEmpleado
    return this.appService.ActualizaTotal(ventaEmpleadoId);
  })
).subscribe((res) => {
  console.log(res); // Esto se ejecutará después de que ambas operaciones se completen
});

// todo mandar correo
  // const nombres = this.partidas.map(partida => partida.usuario);

    const destino = detalleEliminado.correo;
    console.log(destino);

    const informacionCorreo = {
      numFactura :  this.numPedido.get('Pedido').value,
      correoDestino: detalleEliminado.correo,
      Fecha:fecha,
      Nombre:detalleEliminado.usuario,
      Producto:detalleEliminado.producto
    }



    const datosCorreo = this.partidas.map(partidas => ({

      numFactura :  this.numPedido.get('Pedido').value,
      Nombre: partidas.usuario,
      Fecha :fecha,
      correoDestino:partidas.correo,
      Producto:partidas.producto,

    }))

    console.log(datosCorreo);

    this.appService.enviarFacturas(informacionCorreo.numFactura,informacionCorreo.correoDestino,informacionCorreo.Fecha,informacionCorreo.Nombre,informacionCorreo.Producto).subscribe((res)=>{
      console.log(res);
    })
//

    // const destinatarios = {};

//Llenar el objeto con los datos de productos y destinatarios
//   this.partidas.forEach(partida => {
//   const correo = partida.correo;

//   if (!destinatarios[correo]) {
//     destinatarios[correo] = {
//       numFactura: this.numPedido.get('Pedido').value,
//       Nombre: partida.usuario,
//       Fecha: fecha,
//       correoDestino: partida.correo,
//       Productos: [partida.producto]
//     };
//   } else {
//     destinatarios[correo].Productos.push(partida.producto);
//   }
// });

// Iterar a través de los destinatarios y enviar correos
// for (const correo in destinatarios) {
//   const detalles = destinatarios[correo];
//   const productosTexto = detalles.Productos.join(', ');
// }

// console.log(destinatarios);


// this.appService.enviarFacturas(destinatarios).subscribe((res =>{
//   console.log(res)
// }))







      //todo en esta funcion hace que al darle click se elimine al instante
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

  this.ventasEmpleado = ventaCanceladaIds


    //pendiente, me cambia tdos los eliminados, solo quiero cambiar un estatus
    //todo esto de abajo es para cancelar varias ventas
    // this.appService.CerrarVenta(ventaCanceladaIds).subscribe((res) => {
    //   console.log(res)
    // })

  // this.cancelarEstatusConsolidado();


  }


  cancelarEstatusConsolidado(id){
    this.appService.cambiarEstatusConsolidado(id).subscribe((res) =>{
      console.log(res)
    })
    this.insertarFactura();

  }

  // agregarLasVentas(){

  //  const  ventas = {
  //   rhUsuarioId : this.partidas


  //   }

  //   this.appService.AddVentaEmpleado().subscribe((res)=>{
  //     console.log(res)
  //   })
  // }


  insertarFactura(){

    const numFactura = this.numPedido.get('Pedido').value;

    const factura = {
      numeroFactura: numFactura,
      id:   this.IdSeleccionado,
    }

    this.appService.insertarFactura(factura.numeroFactura,factura.id).subscribe((res)=>{
      console.log(res);
    })

  } //cambiar valores en api


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

//obtener fecha
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.formatNumber(currentDate.getMonth() + 1);
    const day = this.formatNumber(currentDate.getDate());
    return `${year}-${month}-${day}`;
  }
  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }


  //mandar el correo a cada usuario de su venta

  sendMail(index:number){

    if (index >= 0 && index < this.detalleVentasArray.length) {
      const detalleEliminado = { ...this.detalleVentasArray[index] };
      this.detalleVentasArray[index].eliminado = true;
      this.partidas.push(detalleEliminado);
      console.log(this.partidas);

      const fecha = this.getCurrentDate();
      const principalesDatos = {
        Nombre:detalleEliminado.usuario,
        numFactura :  this.numPedido.get('Pedido').value,
        correoDestino:detalleEliminado.correo
      }
      console.log(principalesDatos);

      const datosCorreo = this.partidas.map(partidas => ({

        // Fecha :fecha,
        // correoDestino:partidas.correo,
        Producto:partidas.Producto

      }))

      console.log(datosCorreo);
      //!Hare lo del correro individualmente con cada detalle y su boton

      // this.appService.enviarFacturas(principalesDatos.numFactura,principalesDatos.Nombre,principalesDatos.correoDestino,datosCorreo).subscribe((res =>{
      //   console.log(res);
      // }))





  }

}





}

