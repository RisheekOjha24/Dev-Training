import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css'],
})
export class BlogManagementComponent implements OnInit {
  blogService = inject(BlogService);
  router=inject(Router);
  blogs: any[] = [];
  filteredBlogs: any[] = [];
  searchTerm: string = '';
  selectedSortOption: string = '';

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.applyFiltersAndSorting(); // Initial display with sorting and filtering
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      },
    });
  }

  onSearchChange(): void {
    this.applyFiltersAndSorting(); // Reapply both filters and sorting
  }

  onSortChange(): void {
    this.applyFiltersAndSorting(); // Reapply both filters and sorting
  }

  applyFiltersAndSorting(): void {
    // Filter blogs based on the search term
    const term = this.searchTerm.toLowerCase();
    this.filteredBlogs = this.blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.authorName.toLowerCase().includes(term)
    );

    // Sort the filtered blogs based on the selected option
    if (this.selectedSortOption === 'pending') {
      this.filteredBlogs = this.filteredBlogs.filter((blog) => !blog.approved);
    } else if (this.selectedSortOption === 'approved') {
      this.filteredBlogs = this.filteredBlogs.filter((blog) => blog.approved);
    } else if (this.selectedSortOption === 'recent') {
      this.filteredBlogs = this.filteredBlogs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }

  approveBlog(blogId: string): void {
    // Approve blog logic
  }

  viewBlog(blogId: string): void {
    this.router.navigate([`/viewBlog/${blogId}`]);
  }
}
