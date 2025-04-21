import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent {
  users = [
    { name: 'Іван', email: 'ivan@example.com', role: 'admin', id: 1 },
    { name: 'Марія', email: 'maria@example.com', role: 'user', id: 2 },
  ];

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}
