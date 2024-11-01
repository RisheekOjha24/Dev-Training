import { AuthService } from './../../service/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogService } from './../../service/blog.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
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

  blogService = inject(BlogService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.currentUser.subscribe((userObj) => {
      this.username = userObj.username;
      this.email = userObj.email;
    });

    if (this.email) {
      this.blogService.getBlogsByEmail(this.email).subscribe({
        next: (data) => {
          this.blogs = data;
          this.filteredBlogs=data;
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
}
