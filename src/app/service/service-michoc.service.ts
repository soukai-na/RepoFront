import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { service_michoc } from '../model/service-michoc';

@Injectable({
  providedIn: 'root'
})
export class ServiceMichocService {

  baseURL: string = "http://localhost:5000/";
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL + "services");

  }

  saveService(service: service_michoc): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseURL + "services", JSON.stringify(service), { headers: headers });
  }

  deleteService(id_service: number): Observable<any> {
    return this.http.delete(this.baseURL + "services/" + id_service);
  }


}
