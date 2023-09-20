import { Component, OnInit } from '@angular/core';
import {  Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-openDialog',
  templateUrl: './openDialog.html',
  // styleUrls: ['./mi-componente.component.css']
})
export class openDialog implements OnInit {


  @Input() data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.data = dialogData;
  }
  ngOnInit(): void {

  }

}
