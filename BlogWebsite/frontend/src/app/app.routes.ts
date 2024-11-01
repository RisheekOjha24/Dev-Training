import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyblogsComponent } from './pages/myblogs/myblogs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { ViewBlogComponent } from './pages/view-blog/view-blog.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { SuspendUserComponent } from './pages/suspend-user/suspend-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'my-blogs',
    component: MyblogsComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'createBlog',
    component: CreateBlogComponent,
    pathMatch: 'full',
  },
  {
    path: 'viewBlog/:id',
    component: ViewBlogComponent,
    pathMatch: 'full',
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    pathMatch: 'full',
  },
  {
    path: 'suspended',
    component: SuspendUserComponent,
    pathMatch: 'full',
  }
];
