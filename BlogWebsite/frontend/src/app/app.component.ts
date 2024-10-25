import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'blogWebsite';
  userName:string|null=null;
  router= inject(Router);

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' ; 
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userName = userObj.name;
    }
  }

  ngAfterViewInit(): void {
  }

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    
    if (confirmed) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
