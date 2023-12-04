import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-becario',
  templateUrl: './altaBecario.component.html',
  styleUrls: ['./altaBecario.component.scss'],
})
export class AltaBecarioComponent implements OnInit {
  aceptados: any;
  miFormulario: FormGroup;


  constructor (private rhnet:RhnetService, private fb:FormBuilder, private router:Router) {}


  ngOnInit(): void {

    this.getAceptados()




}


getAceptados(){

  this.rhnet.getAceptados().subscribe((res)=>{
    this.aceptados=res;
    console.log("aceptados",  res)
  })

}

irAlta(id,solicitante,usuario){
  // se redirecciona a la pestaña de alta

  this.router.navigate(['/rhnet/Alta_Becario/Alta_practicante'], {
    queryParams: {id: id , solicitante:solicitante,usuario:usuario}
  });
}

irSolicitud(id){
  this.router.navigate(['/rhnet/Alta_Becario/ver_Solicitud'], {
    queryParams: {id:id}
  });

}




}
