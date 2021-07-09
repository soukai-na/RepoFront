import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable} from 'rxjs';
import { Subscriber } from '../model/subscriber';
import { service_michoc } from '../model/service-michoc';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {


  baseURL:string="http://localhost:5000/";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "subscribers");

  }
  saveSubscriber(id_service:number,subscriber:Subscriber):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
     return this.http.post(this.baseURL+"services/"+id_service+"/subscribers", JSON.stringify(subscriber), {headers: headers});
  }

  deleteSubscribers(id_subscriber:number,id_service:number):Observable<any>{
    return this.http.delete(this.baseURL +"services/"+id_service+ "/subscribers/"+id_subscriber);
  }

  getServices(){
    return this.http.get(this.baseURL+"services");
  }
 
  
  
}
