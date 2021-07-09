import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { materiel } from '../model/materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  baseURL:string="http://localhost:5000/";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "materiels");

  }

  saveMateriel(materiel:materiel):Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(this.baseURL+"materiels", JSON.stringify(materiel), {headers: headers});
  }
  
  deleteMateriels(id_materiel:number):Observable<any>{
    return this.http.delete(this.baseURL+"materiels/"+id_materiel);
  }

  saveMaterielToSubscriber(id_materiel:number,id_subscriber:number,materiel:materiel):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseURL+"materiels/"+id_materiel+"/subscribers/"+id_subscriber, JSON.stringify(materiel), {headers: headers});
  }

  getSubscribers(){
    return this.http.get(this.baseURL+ "subscribers");
  }

  getMaterielById(id_materiel: number): Observable<any> {
    return this.http.get(this.baseURL + "materiels/" + id_materiel);
  }

}
