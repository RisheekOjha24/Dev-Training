import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

    userForm:FormGroup=new FormGroup({
        name:new FormControl("",[Validators.required,Validators.minLength(4)]),
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",[Validators.required,Validators.minLength(4)]),
        confirmPassword:new FormControl("",[Validators.required,Validators.minLength(4)])

    })
    formValue:any;
    
    onSave():void{
      this.formValue= this.userForm.value;

      if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        return; 
      }
      if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      this.register(this.formValue);

    }

    passwordsDoNotMatch(): boolean {
      return this.userForm.value.password !== this.userForm.value.confirmPassword;
    }

    
    register(user: { name: string; email: string; password: string; confirmPassword: string }): void {
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log("Registration successful:", response);
          alert(response.msg || "Registration successful!");
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error("Registration failed:", error);
  
          const errorMsg = error?.error?.msg || "Registration failed. Please try again.";
          alert(errorMsg);
        }
      });
    }
    
  
}
