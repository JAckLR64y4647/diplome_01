import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Описуємо структуру завдання для типізації
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'design' | 'development' | 'testing';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://your-api-url.com/tasks'; // Заміна на реальний API

  constructor(private http: HttpClient) {}

  // Отримуємо завдання
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Додаємо нове завдання
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
