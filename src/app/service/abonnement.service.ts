import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abonnement } from '../model/abonnement';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  
  baseURL:string="http://localhost:5000/";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "AllAbonnements");

  }

  saveAbonnement(abonnement:Abonnement):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
     return this.http.post(this.baseURL+"Abonnements", JSON.stringify(abonnement), {headers: headers});
  }

  deleteAbonnements(id_abonnement:number):Observable<any>{
    return this.http.delete(this.baseURL + "Abonnements/"+id_abonnement);
  }

}
