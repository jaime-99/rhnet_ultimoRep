
import { Template } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-escoger',
  templateUrl: './productos-escoger.component.html'
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

  constructor(public appService: AppService,private activatedRoute: ActivatedRoute,public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts();
    this.verIdProductoPadre();

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

        console.log(this.ProductoId)
      }
      else{
        //colocar algun error
      }
    });
  }


  public agregar(id) {
    // console.log(id)
    this.ProductoId = id
    // console.log(this.ProductoPadreId);
    this.appService.insertarProductosRelacionados(this.ProductoPadreId,this.ProductoId).subscribe((res)=>{
      // console.log(res);
      this.snackBar.open('se relaciono el producto seleccionado a ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });


    })

  }

  // es para ir a siguiente
    public onPageChanged(event){
      this.page = event;
      window.scrollTo(0,0);
    }


}
