import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(public appService: AppService ) {


  }
  currentMonth: number; // variable que cambia dependiendo de el mes
  anio:number=0;

  ngOnInit(): void {
    // console.log(this.currentDate);
    this.currentMonth = this.getCurrentMonth();
    this.anio = this.getCurrentYear();
    // console.log(this.currentMonth);

    // this.actualizarMes();

  }


    public currentDate: Date = new Date(); //obtener la fecha y hora


    //funcion para obtener la fecha
    getCurrentMonth(): number {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso sumamos 1
      return month;
    }
    getCurrentYear():number{
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      return year;
    }


      actualizarMes(){

        const id = {
          idToUpdate:this.currentMonth
        }

      this.appService.actualizarTotalMes(id.idToUpdate).subscribe((res) =>{
        console.log(res);
      })

    }


  }





