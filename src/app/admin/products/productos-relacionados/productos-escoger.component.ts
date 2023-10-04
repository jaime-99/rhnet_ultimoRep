
import { Template } from '@amcharts/amcharts5';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductosRelacionadosComponent } from './productos-relacionados.component';
import { SharedService } from './esRelacionado.service';


@Component({
  selector: 'app-escoger',
  templateUrl: './productos-escoger.component.html',
  styleUrls: ['./productos-escoger.component.scss']
})

export class EscogerProductos implements OnInit {


  public searchText:string="";
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  sub: any;
  ProductoId: number;
  ProductoPadreId: number;
  public product: Product;
  public image: any;
  zoomImage: any;
  public config: SwiperConfigInterface={};
  public products: Array<Product> = [];
  public esSusORel = 'Relacionados'
  esRelacionado: boolean;
  sutitutos =[]
  relacionados=[]

  @Input() subFamilia:string;

  constructor(public appService: AppService,private activatedRoute: ActivatedRoute,public snackBar: MatSnackBar,
    private sharedService:SharedService


    ) {
      this.esRelacionado = this.sharedService.getEsRelacionado();
    }

  ngOnInit() {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts();
    this.verIdProductoPadre();

    // console.log(this.esRelacionado);
    // console.log(this.esRelacionado);

    this.cambiarCadena();
   }



  //Buscar los productos
  public search(event:any){
    this.searchText = (event.target as HTMLInputElement).value;
    //console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.getAllProducts();

  }


  //obtener los productos
  public getAllProducts(){
    this.appService.getProductsApi(this.searchText).subscribe(data=>{
    this.products = data;

    });
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id){
    this.appService.getProductsByIdApi(id).subscribe(data=>{
      this.product = data;
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => {
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }


  //este boton es para agregar el producto con su id al producto padre


  public verIdProductoPadre(){

    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.ProductoPadreId=params['id']
        this.getProductById(params['id']);

        // console.log(this.ProductoId)
      }
      else{
        //colocar algun error
      }
    });
  }



  public agregar(id,name) {
    // console.log(id)
    // if(this.ProductoId ===this.product?.id){
    //   this.snackBar.open('no se puede agregar el mismo producto a relacionads' ,  '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });

    // }
    this.ProductoId = id
    if(this.esRelacionado===true && this.ProductoId !=this.product.id && !this.relacionados.includes(this.ProductoId) ){
    // console.log(this.ProductoPadreId);
    this.appService.insertarProductosRelacionados(this.ProductoPadreId,this.ProductoId).subscribe((res)=>{
      // console.log(res);
      this.snackBar.open('se agrego a relacionados el producto seleccionado ' + name ,  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.relacionados.push(this.ProductoId); // Agregar el ProductoId al arreglo

      // console.log(name)
    })

  }else if (this.esRelacionado ===false && this.ProductoId != this.product.id && !this.sutitutos.includes(this.ProductoId)){
    this.appService.insertarProductosSustitutos(this.ProductoPadreId,this.ProductoId).subscribe((res)=>{
      // console.log(res);
      this.snackBar.open('se agrego a sustituos el producto seleccionado ' + name ,  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.sutitutos.push(this.ProductoId);

      // console.log(name)

    })


  }else if(this.relacionados.includes(this.ProductoId) || this.sutitutos.includes(this.ProductoId)){
    this.snackBar.open('no se puede agregar el mismo producto a relacionados / sustitutos',  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  } else{
    this.snackBar.open('no se puede agregar al producto mismo',  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  }

}

  // es para ir a siguiente
    public onPageChanged(event){
      this.page = event;
      window.scrollTo(0,0);
    }



    cambiarCadena(){
      if(this.esRelacionado ===true ){
        this.esSusORel ='Relaciondos'
      }else{
        this.esSusORel = 'Sustitutos'
      }
    }



}
