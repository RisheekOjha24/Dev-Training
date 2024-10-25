import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  blogService=inject(BlogService);
  blogs: any[] = [];

  ngOnInit(): void {
    this.fetchBlogs();
  }
  fetchBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data; // Assign the fetched data to the blogs array
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    });
  }
}
