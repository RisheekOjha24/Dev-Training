import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { swalAlert } from './components/swalAlert';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'blogWebsite';
  userName: string | null = null;
  email: string | null = null;
  isAdmin: boolean|null= null;
  private router = inject(Router);
  private authService = inject(AuthService);
  isSidebarCollapsed = false;

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userName = userObj.name;
      this.email = userObj?.email;
      this.isAdmin = userObj?.isAdmin;
    } else {
      this.authService.currentUser.subscribe((activeUser) => {
        this.userName = activeUser?.username || null;
        this.email = activeUser?.email || null;
        this.isAdmin = activeUser?.isAdmin || null;
      });
    }
    console.log(this.userName,this.isAdmin,this.email);
  }

  ngAfterViewInit(): void {
  //  console.log(this.isAdmin);
  }

  async logout(): Promise<void> {
    const result = await swalAlert(
      'warning',
      'Are you sure ?',
      'You will be logged out !'
    );

    if (result.isConfirmed) {
      this.authService.setCurrentUser({username:"",email:"",isAdmin:false})
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
