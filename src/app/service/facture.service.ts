import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  baseURL:string="http://localhost:5000/";
  constructor(private http:HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "factures");

  }
  saveFacture(id_subscriber:number,facture:Facture):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
     return this.http.post(this.baseURL+"subscribers/"+id_subscriber+"/factures", JSON.stringify(facture), {headers: headers});
  }

  deleteFactures(id_facture:number):Observable<any>{
    return this.http.delete(this.baseURL + "factures/"+id_facture);
  }

  getSubscribers(){
    return this.http.get(this.baseURL+"subscribers");
  }
 

}
