import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioModelo } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

  url = "https://apiloopbackgrupo25equipo9and.herokuapp.com"
  token: string = ''

  store(servicios: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(`${this.url}/servicios`, {

      fecha:servicios.fecha,
      hora_inicio:servicios.hora_inicio,
      hora_fin:servicios.hora_fin,
      placa:servicios.placa,
      nombre_conductor:servicios.nombre_conductor,
      dinero:servicios.dinero,
      ruta:servicios.ruta
    },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  getAll(): Observable<ServicioModelo[]> {
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(servicios: ServicioModelo): Observable<ServicioModelo> {
    return this.http.patch<ServicioModelo>(`${this.url}/servicios/${servicios.id}`, {
      fecha:servicios.fecha,
      hora_inicio:servicios.hora_inicio,
      hora_fin:servicios.hora_fin,
      placa:servicios.placa,
      nombre_conductor:servicios.nombre_conductor,
      dinero:servicios.dinero,
      ruta:servicios.ruta
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<ServicioModelo[]> {
    return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<ServicioModelo> {
    return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
