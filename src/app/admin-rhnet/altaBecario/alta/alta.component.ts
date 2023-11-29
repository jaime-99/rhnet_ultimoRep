import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class Alta implements OnInit {
  aceptados: any;

  constructor (private rhnet:RhnetService) {}


  ngOnInit(): void {

  }

}
