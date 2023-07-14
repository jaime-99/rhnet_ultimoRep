import { array } from '@amcharts/amcharts5';
import { Component, OnInit} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { response } from 'express';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { id } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-misPedidos',
  templateUrl: './misPedidos.component.html',
  styleUrls: ['./misPedidos.scss']
})

export class misPedidos  implements OnInit{

  NumeroEmpleado ="";
  Nombre ="";
  grandTotal:number;
  Producto ="";
  Fecha:Date;
  public Ventas:any= [];
  Estatus:boolean;
  numPedido:number=0; // para ver que cuales son mis ped

  numerodeUsuario = 0;
  ventasCanceladas = [];
  ventaId=0;
  numeroDeVenta =0;



  constructor(public appService: AppService, private dialog: MatDialog,
    ) { }

  ngOnInit()  {


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.Nombre = userauth.Nombre;
    this.NumeroEmpleado = userauth.data.Numero_Empleado;


    this.numerodeUsuario = userauth.UsuarioId;


    // es para ver solo los del el RhUsuarioId
    this.appService.GetVentasEmpleadoPorId(userauth.UsuarioId).subscribe((res)=>{
      this.Ventas = res.filter((venta) => venta.RhUsuarioId === userauth.UsuarioId);

      //this.Ventas=res;

      console.log(this.Ventas);
      console.log(userauth.UsuarioId)
      //this.numeroDeVenta = Ventas.ventaEmpleadoId;

      for (let venta of this.Ventas) {
        let idEstatusVentaEmpleado = venta.idEstatusVentaEmpleado;
        console.log('Valor de idEstatusVentaEmpleado:', venta.IdEstatusVentaEmpleado);

        // Verificar el valor de idEstatusVentaEmpleado y mostrar el botón en caso de ser 1
        if (idEstatusVentaEmpleado === 1) {
          // this.mostrarBotonCancelar = true; c
          console.log("es uno ");
        } else {
          // this.mostrarBotonCancelar = false;
          console.log("no es uno");
        }
      }

    });


  //   this.appService.Data.cartList.forEach(product => {
  //     this.grandTotal += product.cartCount * product.newPrice;

  // }
  }



    BtnCancelar(id): void {

      this.appService.CancelarVenta(id).subscribe((res) => {

        //location.reload();  // hace que la pagina se recargue automaticamente

      })
    }


    mostrarMensajeAlerta(id):void{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: {
          title: "Cancelar Pedido",
          message: "Estas seguro que quieres cancelar el pedido?"
        }

      });
      // cuando se cierra el dialogo
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.appService.CancelarVenta(id).subscribe((res) => {
            // Lógica después de cancelar la venta
            console.log(res); // Imprime la respuesta en la c
            location.reload();
          })
      }});
    }

    }






