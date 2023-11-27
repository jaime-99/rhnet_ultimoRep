import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-aprobar-becario-rh',
  templateUrl: './aprobarBecarioRH.component.html',
  styleUrls: ['./aprobarBecarioRH.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AprobarBecarioRHComponent implements OnInit {

  constructor (private RhnetService:RhnetService ) {  }

  ngOnInit(): void {



  }



}
