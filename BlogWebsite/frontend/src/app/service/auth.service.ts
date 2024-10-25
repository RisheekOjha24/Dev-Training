import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/auth';

  register(user: { name:string,email: string; password: string,confirmPassword:string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`,user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`,credentials);
  }


}
