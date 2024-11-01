import { AuthService } from './../../service/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogService } from './../../service/blog.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, LottieComponent],
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css'],
})
export class MyblogsComponent implements OnInit {
  blogs: any[] = [];
  filteredBlogs: any[] = [];
  username: string | null = null;
  email: string | null = null;
  searchTerm: string = '';
  sortBy: string = 'sortItem';

  options: AnimationOptions = {
    path: 'https://lottie.host/9ef23ea9-e622-4b3a-a79e-b9d16ec7c8de/VnzAQYHWx6.json',
  };

  blogService = inject(BlogService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.username = userObj.name;
      this.email = userObj.email;
    }
    
    if (this.email) {
      this.blogService.getBlogsByEmail(this.email).subscribe({
        next: (data) => {
          this.blogs = data;
          this.filteredBlogs = data;
          console.log(this.blogs);
        },
        error: (error) => {
          console.error('Error fetching blogs:', error);
        },
      });
    }
  }
  navigateToView(blogId: string): void {
    this.router.navigateByUrl(`/viewBlog/${blogId}`);
  }

  //sorting and filtering code

  filterBlogs(): void {
    this.filteredBlogs = this.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortBlogs(); // Sort after filtering
  }

  sortBlogs(): void {
    if (this.sortBy === 'recent') {
      this.filteredBlogs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      this.filteredBlogs.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }

  animationCreated(animationItem: AnimationItem): void {
     animationItem.setSpeed(2);
  }
}
