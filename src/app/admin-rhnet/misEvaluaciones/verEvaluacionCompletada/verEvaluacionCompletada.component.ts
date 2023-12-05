import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';

@Component({

  templateUrl: './verEvaluacionCompletada.component.html',
  styleUrls: ['./verEvaluacionCompletada.component.scss'],
})
export class VerEvaluacionCompletadaComponent implements OnInit  {
  competencias: any;

  constructor (private rhService:RhnetService) {}


  ngOnInit(): void {

    this.rhService.getCompetencias().subscribe((res)=>{
      this.competencias = res
      console.log(res)
    })

  }






 }
