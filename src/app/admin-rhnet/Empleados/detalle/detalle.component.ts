import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',

  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  constructor ( private rhnet:RhnetService, private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const empleadoId = params['id'];
      console.log(empleadoId)
      // Hacer lo que necesites con el parámetro
    });
  }




  getEmpleado(){

    this.rhnet



  }




}
