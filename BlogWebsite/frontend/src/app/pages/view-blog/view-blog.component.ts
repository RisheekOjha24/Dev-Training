import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Blog } from '../../model/blog.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [DatePipe,CommonModule,RouterModule],
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  blog: Blog | null = null;
  errorMessage: string = '';
  username: string | null = null;
  email: string | null = null;

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');

    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.username = userObj.name;
      this.email = userObj.email;
    }

    if (blogId && this.email) {
      this.fetchBlog({ email: this.email, blogId });
    }
  }

  fetchBlog(blogIdAndEmail: { email: string; blogId: string }) {
    this.blogService.getBlogById(blogIdAndEmail).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Error loading blog';
        console.log(this.errorMessage);
      },
    });
  }
}
