import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private defaultUser = {
    username: '',
    email: '',
    isAdmin: false,
    isSuspended: false,
    unreadCount: 0,
  };

  currentUser = new BehaviorSubject<{
    username: string;
    email: string;
    isAdmin: boolean;
    isSuspended: boolean;
    unreadCount: number;
  }>(this.defaultUser);

  loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser.next(user);
    }
  }

  private baseUrl = 'http://localhost:5000/api/auth';

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
  getNotificationByEmail(userEmail: string): Observable<any> {
    const encodedEmail = encodeURIComponent(userEmail);
    return this.http.get<any>(
      `${this.baseUrl}/notifications?email=${encodedEmail}`
    );
  }

  sendReadByEmail(userEmail: string): Observable<any> {
    const encodedEmail = encodeURIComponent(userEmail);
    return this.http.get<any>(
      `${this.baseUrl}/notificationsRead?email=${encodedEmail}`
    );
  }

  //Method for emiting values

  setCurrentUser({
    username,
    email,
    isAdmin,
    isSuspended,
    unreadCount,
  }: {
    username: string;
    email: string;
    isAdmin: boolean;
    isSuspended: boolean;
    unreadCount: number;
  }): void {
    // Emit the new user object
    this.currentUser.next({
      username,
      email,
      isAdmin,
      isSuspended,
      unreadCount,
    });
  }
}
