
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default ,
})

export class detallesComponent implements OnInit {
  idParam: any;
  detalle: any;
  miFormulario: FormGroup;
  submited = false;
  pantalla= false;

  constructor (private fb: FormBuilder, private rhnet:RhnetService, private route: ActivatedRoute, private location: Location,
    public snackBar: MatSnackBar)
  {

    this.miFormulario = this.fb.group({
      comentarios: ['', Validators.required]
    });


  }


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // Obtener el valor del parámetro 'id' de la consulta
      this.idParam = params['id'];
      // Llamar a la función para cargar los detalles usando this.idParam
      this.detalles();
    });

  }



  // es para ver los detalles de cada columna
  detalles(){

    this.rhnet.getDetalleID(this.idParam).subscribe((res)=>{
      this.detalle = res
      // console.log(res)

    })
  }

  onSubmit(){
    const valorComentarios = this.miFormulario.get('comentarios').value;
    if(this.miFormulario.valid){

      this.rhnet.addComentarioRH(valorComentarios,this.idParam).subscribe((res)=>{

        this.changeEstatus()
        this.snackBar.open('has aceptado la solicitud de becario', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.pantalla=true

      })
    }else{
      this.snackBar.open('Falta llenar campo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      this.submited = true;
    }

  }

  changeEstatus(){
    // cambiar estatus a 4 de aceptado por RH
    this.rhnet.updateEstatus(4,this.idParam).subscribe((res)=>{
      console.log(res)
    })

  }

  regresar(){
    this.location.back();
  }

  cancelarSol(){
    // cambiar el estatus a 5

    if(this.miFormulario.valid){
    const valorComentarios = this.miFormulario.get('comentarios').value;


    this.rhnet.updateEstatus(5,this.idParam).subscribe(()=>{

      this.rhnet.addComentarioRH(valorComentarios,this.idParam).subscribe(()=>{

        this.snackBar.open('Has Cancelado la solicitud de becario', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.pantalla=true


      })

    })
  }else{
    this.snackBar.open('Falta llenar campo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      this.submited = true;

  }
  }


}
