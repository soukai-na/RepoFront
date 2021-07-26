import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:5000/user';
  private adminUrl = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<any> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }
 
 
  getAdminBoard(): Observable<any> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
