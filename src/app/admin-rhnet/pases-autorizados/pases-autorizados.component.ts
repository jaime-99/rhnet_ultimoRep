import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';


@Component({
  selector: 'app-pases-autorizados',
  templateUrl: './pases-autorizados.component.html',
  styleUrls: ['./pases-autorizados.component.scss']
})
export class PasesAutorizadosComponent implements OnInit {

  pasesAutorizados = []

  constructor(private rhnetService: RhnetService ) { }

  ngOnInit(): void {

    this.getPasesAutorizados();

  }

  //son los pases que son han sido autorizados
  getPasesAutorizados(){

    this.rhnetService.getPasesAutorizados().subscribe((res=>{
      this.pasesAutorizados = res
      console.log(this.pasesAutorizados)
    }))

  }

  recargar(){
    this.getPasesAutorizados();
  }

}
