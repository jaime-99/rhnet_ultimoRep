import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-todo-los-pases',
  templateUrl: './todo-los-pases.component.html',
  styleUrls: ['./todo-los-pases.component.scss']
})
export class TodoLosPasesComponent implements OnInit {
  pases: any;

  constructor(private  rhService:RhnetService) { }

  ngOnInit(): void {

    this.rhService.getTodosLosEmpleados().subscribe((res)=>{
      this.pases = res
    })

  }

}
