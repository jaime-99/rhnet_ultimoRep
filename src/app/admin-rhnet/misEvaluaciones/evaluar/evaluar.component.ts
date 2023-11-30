import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss'],
})
export class EvaluarComponent implements OnInit {
  elementos: any;

  Competencia = [
    { id: 1, competencia: 'Habilidades', descripcion:'se evaluara las Habilidades del becario' },
    { id: 2, competencia: 'Aptitudes' , descripcion: 'Se evaluara las aptitudes de becario'},
    { id: 3, competencia: 'Actitudes', descripcion: 'Se evaluara las actitudes de becario' }
    // Agrega más universidades según sea necesario
  ];
  elemento: any;


  constructor (private rhnetService:RhnetService) {}



  ngOnInit(): void {

    this.getCompetencias();

  }

  getCompetencias(){
    this.rhnetService.getCompetencias().subscribe((res)=>{
      this.elementos = res
    })
  }



}
