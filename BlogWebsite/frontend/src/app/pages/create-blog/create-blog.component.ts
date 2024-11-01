import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, CommonModule],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  email:string|null=null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(file); // Display a preview
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const formData: any = new FormData(); // Define formData as any type
      formData.append('title', this.blogForm.get('title')?.value);
      formData.append('content', this.blogForm.get('content')?.value);

       const userInfo: string | null = localStorage.getItem('user');
       if (userInfo) {
         const user = JSON.parse(userInfo); // Define user as User type
         formData.append('email', user.email); // Set the email from local storage
       } else {
         console.error('User info not found in local storage');
         return; // Handle case where user info is not available
       }

      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Append the selected file
      }

      // Send the formData to the backend
      this.http
        .post('http://localhost:5000/api/blog/newblog', formData)
        .subscribe(
          (response) => {
            console.log('Blog submitted successfully', response);
            // Handle success response here (e.g., reset form, show a message)
          },
          (error) => {
            console.error('Error submitting blog:', error);
            // Handle error response here (e.g., show error message)
          }
        );
    }
  }
}
