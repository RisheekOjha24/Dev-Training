import { routes } from './app.routes';
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
export class AppComponent implements OnInit{
  title = 'blogWebsite';
  userName: string | null = null;
  email: string | null = null;
  isAdmin: boolean|null= null;
  isSuspended:boolean|null=null;
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
      this.email = userObj.email;
      this.isAdmin = userObj.isAdmin;
      this.isSuspended = userObj.isSuspended;

    } else {
      this.authService.currentUser.subscribe((activeUser) => {
        this.userName = activeUser?.username ;
        this.email = activeUser?.email;
        this.isAdmin = activeUser?.isAdmin;
        this.isSuspended = activeUser.isSuspended;
      });
    }
  }

  signIn():void{
    this.router.navigateByUrl('/login')
  }
  async logout(): Promise<void> {
    const result = await swalAlert(
      'warning',
      'Are you sure ?',
      'You will be logged out !'
    );

    if (result.isConfirmed) {
      this.authService.setCurrentUser({username:"",email:"",isAdmin:false,isSuspended:false})
      localStorage.clear();
       window.location.href = '/login';
    }
  }
}
