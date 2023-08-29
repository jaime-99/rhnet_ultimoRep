import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cproductlist',
  templateUrl: './cproductlist.component.html',
  styleUrls: ['./cproductlist.component.scss']
})
export class CproductlistComponent implements OnInit {
  @Input('products') products: Array<Product> = [];
  @Input('ProductoPadreId') ProductoPadreId:any;
  @Input('EsRelacionado') EsRelacionado:any;
  @Input('ProductoRelacionadoId') ProductoRelacionadoId:any;


  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  id:number;
  p_ProductoId :number;
  // snackBar: any;
  constructor(public appService:AppService, public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.EsRelacionado);
  }
  agrega()
  {
    alert(this.EsRelacionado);
  }
  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;


    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  public onPageChanged(event){
    this.page = event;
    window.scrollTo(0,0);
  }

  verSustitutos(id){
    // es para ver los productos sustitutos

    //!validar si es o no relacionado en esta misma funcion para que cuando sea relacionado llame a la otra de eliminar
    //! y cuando sea sustituto llame a la otra

    this.appService.verSustitutos(id).subscribe((res)=>{
    console.log(res);

    const productoInfo = res.productoInfo; // debo obtener el valor de sustitutoId

    if (res.productoInfo && res.productoInfo.length > 0) {
      for (const producto of res.productoInfo) {
        const productoSustitutoId = producto.ProductoSustitutoId;
        console.log('ProductoSustitutoId:', productoSustitutoId);
        this.id= productoSustitutoId
        this.remove()
      }
    }
    });

  }

  remove(){
    //eliminar relacionado
    // this.id = id

    if(this.EsRelacionado===0){

    this.appService.eliminarSustitutos(this.id).subscribe((res)=>{
      console.log(res);
      console.log(this.id);
      this.snackBar.open('se elimino el producto seleccionado '  ,  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });


    })
  }

  else if(this.EsRelacionado===0){
    console.log('no es relacionado')
  }
}


}
