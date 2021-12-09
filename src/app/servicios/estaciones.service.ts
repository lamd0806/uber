import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstacionModelo } from '../modelos/estacion.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  url = "https://apiloopbackgrupo25equipo9and.herokuapp.com"
  token: string = ''

  store(estaciones: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estaciones`, {

      nombre:estaciones.nombre,
      direccion:estaciones.direccion,
      coordenada_x:estaciones.coordenada_x,
      coordenada_y:estaciones.coordenada_y,
      tipo:estaciones.tipo},
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  getAll(): Observable<EstacionModelo[]> {
    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(estaciones: EstacionModelo): Observable<EstacionModelo> {
    return this.http.patch<EstacionModelo>(`${this.url}/estaciones/${estaciones.id}`, {
      nombre:estaciones.nombre,
      direccion:estaciones.direccion,
      coordenada_x:estaciones.coordenada_x,
      coordenada_y:estaciones.coordenada_y,
      tipo:estaciones.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EstacionModelo[]> {
    return this.http.delete<EstacionModelo[]>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EstacionModelo> {
    return this.http.get<EstacionModelo>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}
