import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'design' | 'development' | 'testing';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
  projectId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://your-api-url.com/api/tasks'; // Замените на ваш API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Получить все задачи
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получить задачи по статусу
   */
  getTasksByStatus(status: Task['status']): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?status=${status}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получить задачу по ID
   */
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Создать новую задачу
   */
  createTask(taskData: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Обновить задачу
   */
  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, updates).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Удалить задачу
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Обновить статус задачи
   */
  updateTaskStatus(id: number, newStatus: Task['status']): Observable<Task> {
    return this.updateTask(id, { status: newStatus });
  }

  /**
   * Получить задачи для проекта
   */
  getTasksForProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?projectId=${projectId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Обработка ошибок
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(
      error.error?.message || error.message || 'Server error'
    ));
  }
}