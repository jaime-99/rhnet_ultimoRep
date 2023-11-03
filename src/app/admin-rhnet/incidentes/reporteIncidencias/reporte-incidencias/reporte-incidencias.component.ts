import { Component, OnInit } from '@angular/core';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.scss']
})
export class ReporteIncidenciasComponent implements OnInit {

 public incidenciasEmpleado: any
 page = 1; // Página actual
 count:any
 public counts = [12, 24, 36];

  itemsPerPage = 10; // C
  constructor(private rhService: RhnetService) { }

  ngOnInit(): void {
    this.count = this.counts[0];



    this.obtenerIncidenciasEmpleados();


  }


  obtenerIncidenciasEmpleados(){
   this.rhService.getIncidenciasEmpleados().subscribe((res)=>{
    this.incidenciasEmpleado = res
   })

}


public onPageChanged(event){
  this.page = event;



  // this.router.navigate(['/productos'], { queryParams: { page: event } });


  // else{
  //   this.onChangeCategory(event);

  // }


  // if (isPlatformBrowser(this.platformId)) {
  //   window.scrollTo(0,0);
  // }
}




}
