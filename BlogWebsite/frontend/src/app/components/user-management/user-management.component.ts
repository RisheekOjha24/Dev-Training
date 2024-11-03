import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from './../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { swalAlert } from '../swalAlert';
import { swalMessage } from '../swalMessage';
import { swalNotify } from '../swalNotify';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  regularUsers: any[] = []; // Holds non-admin users
  adminUsers: any[] = []; // Holds admin users
  searchTerm: string = '';

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (userArray) => {
        this.users = userArray;
        this.filteredUsers = userArray;
        this.updateUserLists(); // Initialize filtered lists
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateUserLists(); // Update regular and admin lists
  }

  updateUserLists(): void {
    this.regularUsers = this.filteredUsers.filter((user) => !user.isAdmin);
    this.adminUsers = this.filteredUsers.filter((user) => user.isAdmin);
  }

  async toggleAccUser(user: any): Promise<void> {
    const status: string = user.isSuspended ? 'activated' : 'suspended';
    const msg: string = `${user.name}'s account will be ${status}`;
    const res = await swalAlert('question', msg, 'Click Yes to proceed');

    if (res.isConfirmed) {
      this.adminService.suspendUser(user._id).subscribe(() => {
        this.fetchUsers(); // Refresh the user list after suspension
      });
    }
  }

  async sendMessage(userId: string): Promise<void> {
    const { value: msg, isConfirmed } = await swalMessage();
    console.log(msg);
    if (isConfirmed && msg) {
      this.adminService.notification(userId, msg.message).subscribe({
        next: () => {
          swalNotify("success","Message sent successfully");
        },
        error: (error) => {
          console.error('Error sending message:', error);
          swalNotify('error', 'Failed to send the message');
        },
      });
    }
  }
}
