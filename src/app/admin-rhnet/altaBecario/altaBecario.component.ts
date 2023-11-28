import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-alta-becario',
  templateUrl: './altaBecario.component.html',
  styleUrls: ['./altaBecario.component.scss'],
})
export class AltaBecarioComponent implements OnInit {
  aceptados: any;

  constructor (private rhnet:RhnetService) {}


  ngOnInit(): void {
    this.aceptados()





  }

  getAceptados(){

    this.rhnet.getAceptados().subscribe((res)=>{
      this.aceptados=res;
    })

  }






}
