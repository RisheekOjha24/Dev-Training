import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
  });

  formValue: any;

  onSave(): void {
    this.formValue = this.loginForm.value;

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return; 
    }
    
    console.log("formdata :", this.formValue);
    this.login(this.formValue); 
  }

  login(credentials: { email: string; password: string }): void {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log("Login successful:", response);

             // Store user info in localStorage
             const user = {
              name: response.name,
              email: credentials.email
            };
    
            localStorage.setItem('user', JSON.stringify(user));
        alert(response.msg || "Login successful!"); 
        this.router.navigate(['/home']); 
      },
      error: (error) => {
        console.error("Login failed:", error);
 
        const errorMsg = error?.error?.msg || "Login failed. Please check your credentials and try again.";
        alert(errorMsg);
      }
    });
  }
  
}
