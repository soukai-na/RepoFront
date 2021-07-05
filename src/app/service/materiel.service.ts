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
    return this.http.get(this.baseURL+ "AllMateriels");

  }

  saveMateriel(materiel:materiel):Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(this.baseURL+"Materiels", JSON.stringify(materiel), {headers: headers});
  }
  
  deleteMateriels(id_materiel:number):Observable<any>{
    return this.http.delete(this.baseURL+"Materiels/"+id_materiel);
  }



}
