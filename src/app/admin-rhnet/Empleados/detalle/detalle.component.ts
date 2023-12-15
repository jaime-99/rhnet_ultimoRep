import { CommonModule ,Location} from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',

  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  empleadoId: any;
  infoEmpleado: any;
  urlImage = 'https://dikeninternational.com/rhnet/uploads/'
  public userImage = 'assets/images/others/admin.jpg';
  imagenUsu: string = '';
  num: any; // para saber que empelado nos llega si uno de baja o uno actuivo


  constructor ( private rhnet:RhnetService, private route:ActivatedRoute,private location:Location) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const empleadoId = params['id'];
      this.empleadoId = empleadoId
      const num = params['num'];
      console.log(num)
      this.num = num
      this.getEmpleado();

      // console.log(this.userImage)

      let userauth=JSON.parse(localStorage.getItem('datalogin')!);
      // this.userImage=userauth.Imagen;
      // Hacer lo que necesites con el parámetro
    });
  }




  getEmpleado(){

    if(this.num==='1'){

    this.rhnet.getEmpleadosById(this.empleadoId).subscribe((res)=>{
      this.infoEmpleado = res
      this.imagenUsu = res.nombre_imagen
      this.urlImage = this.urlImage + this.imagenUsu;
      console.log(res,1)
      // console.log(this.urlImage)
    })
  }else {
    this.rhnet.getEmpleadosBajaDetalle(this.empleadoId).subscribe((res)=>{
      this.infoEmpleado = res
      this.imagenUsu = res.nombre_imagen
      this.urlImage = this.urlImage + this.imagenUsu
      console.log(res, 2)
    })

  }
  }


  regresar(){
    this.location.back()
  }




}
