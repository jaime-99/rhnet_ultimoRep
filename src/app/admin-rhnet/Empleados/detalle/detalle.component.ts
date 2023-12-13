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


  constructor ( private rhnet:RhnetService, private route:ActivatedRoute,private location:Location) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const empleadoId = params['id'];
      this.empleadoId = empleadoId
      this.getEmpleado();

      console.log(this.userImage)

      let userauth=JSON.parse(localStorage.getItem('datalogin')!);
      // this.userImage=userauth.Imagen;
      // Hacer lo que necesites con el parámetro
    });
  }




  getEmpleado(){

    this.rhnet.getEmpleadosById(this.empleadoId).subscribe((res)=>{
      this.infoEmpleado = res
      this.imagenUsu = res.nombre_imagen
      this.urlImage = this.urlImage + this.imagenUsu;
      console.log(this.urlImage)
    })

  }

  regresar(){
    this.location.back()
  }




}
