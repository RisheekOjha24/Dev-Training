import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:5000/api/auth';


  currentUser = new BehaviorSubject<{ username: string; email: string,isAdmin:boolean,isSuspended:boolean }>(
    {"username": "", "email": "",isAdmin:false,isSuspended:false}
  );

  register(user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  //Method for emiting values

  setCurrentUser({
    username,
    email,
    isAdmin,
    isSuspended
  }: {
    username: string;
    email: string;
    isAdmin:boolean;
    isSuspended:boolean
  }): void {
    // Emit the new user object
    this.currentUser.next({ username, email,isAdmin,isSuspended });
  }
}
