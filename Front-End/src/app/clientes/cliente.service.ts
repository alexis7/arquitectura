import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { formatDate} from '@angular/common';


@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://musicstore/api/inventary/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.urlEndPoint}searchall`).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.referencia = cliente.referencia.toUpperCase();
          cliente.fecha_creacion = formatDate(cliente.fecha_creacion,'yyyy-MM-dd','en-US');
          return cliente;
        });
      })
      
    )
  } 

  createClientes(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}save`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e);
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getOneCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}search/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );

  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}edit/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al actualizar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}delete/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
