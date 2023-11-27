import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RhnetService } from '../../rhnet.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-solicitud',

  templateUrl: './detalleSolicitud.component.html',
  styleUrls: ['./detalleSolicitud.component.scss'],
})
export class DetalleSolicitudComponent implements OnInit {
  detalle: any;
  miFormulario: FormGroup;
  submited = false
  idDetalle: any;
  verTerminado: boolean = false; // es para ver una pantalla de que se termino el formulario de solicitud a jefe

  constructor (private fb: FormBuilder,private route: ActivatedRoute, private rhService:RhnetService, private location:Location,
    private mat:MatSnackBar){

    this.miFormulario = this.fb.group({
      comentarios: ['', Validators.required]
    });
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.idDetalle = id
      this.getDetalles(id)


    });
  }

  getDetalles(id){

    this.rhService.getDetalleID(id).subscribe((res)=>{
      this.detalle = res
        })
  }

  regresar(){
    this.location.back();
  }

  onSubmit(){
    // es para enviar los comentarios que colocaste y activar el estatus en 2
    if(this.miFormulario.valid){
      // console.log(this.miFormulario.value)

      const valor = this.miFormulario.get('comentarios').value;

      this.rhService.addComentarioJefe(valor,this.idDetalle).subscribe((res)=>{
        // console.log(res)

        this.mat.open('Has aceptado la solicitud', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.rhService.updateEstatus('2',this.idDetalle).subscribe(()=>{
          this.verTerminado = true;
        })


      })

    }else{
      this.submited= true
    }
  }




}
