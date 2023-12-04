import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';
import { CouponsModule } from 'src/app/admin/coupons/coupons.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './verSolicitud.component.html',
  styleUrls: ['./verSolicitud.component.scss'],
})
export class VerSolicitudComponent implements OnInit {
  soli: any;

  constructor ( private rhnetService:RhnetService, private route:ActivatedRoute,private location:Location){ }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Aquí puedes trabajar con los parámetros recibidos
      const id = params['id'];
      console.log(id)
      this.solicitud(id)
    });




  }

  solicitud(id){
    this.rhnetService.getDetalleID(id).subscribe((res)=>{
      console.log(res)
      this.soli = res
    })
  }

  regresar(){
    this.location.back()

  }



}
