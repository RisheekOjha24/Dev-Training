import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/blog';


  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/blogs`);
  }


}
