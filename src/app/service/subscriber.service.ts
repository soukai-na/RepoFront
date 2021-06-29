import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs';
import { Subscriber } from '../model/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {


  baseURL:string="http://localhost:5000/api/v1";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseURL+ "/AllSubscribers");

  }
  saveSubscriber(subscriber:Subscriber):Observable<any>{
     return this.http.post(this.baseURL+"/Subscribers", JSON.stringify(subscriber));
  }
  
  
}
