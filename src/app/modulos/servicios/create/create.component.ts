import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private rutasService: RutasService, private fb: FormBuilder,
    private servicioService: ServiciosService,
    private router: Router) { }

    listadoRutas: RutaModelo[] = []

    fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      dinero: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
    });
  

  ngOnInit(): void {
    this.getAllRutas()
  }
  getAllRutas(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

  store(){
    let servicio = new ServicioModelo;
    
    servicio.fecha = new Date(this.fgValidacion.controls["fecha"].value).toISOString()
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa = this.fgValidacion.controls["placa"].value;
    servicio.nombre_conductor=this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero = this.fgValidacion.controls["dinero"].value;
    servicio.ruta=this.fgValidacion.controls["ruta"].value;
 
    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
