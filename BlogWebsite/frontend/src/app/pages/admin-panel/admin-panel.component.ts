import { Component } from '@angular/core';
import { UserManagementComponent } from '../../components/user-management/user-management.component';
import { BlogManagementComponent } from '../../components/blog-management/blog-management.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule,FormsModule,UserManagementComponent,
    BlogManagementComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  userComponentActive:boolean=true;
  showUserPage():void{
    if(!this.userComponentActive)this.userComponentActive = true;    
  }

  

}
