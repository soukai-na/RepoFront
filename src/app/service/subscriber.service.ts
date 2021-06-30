import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable} from 'rxjs';
import { Subscriber } from '../model/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {


  baseURL:string="http://localhost:5000/";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "AllSubscribers");

  }
  saveSubscriber(subscriber:Subscriber):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
     return this.http.post(this.baseURL+"Subscribers", JSON.stringify(subscriber), {headers: headers});
  }

  deleteSubscriber(id_sub:number):Observable<any>{
    return this.http.get(this.baseURL + "Subscribers/"+id_sub);
  }
  
  
}
