import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    // return this.http.get('/api/tasks');
    return of([
      { id: 1, title: 'Fix bug', priority: 'critical', done: false },
      { id: 2, title: 'Add chart', priority: 'medium', done: true }
    ]);
  }

  createTask(task: any): Observable<any> {
    console.log('Create task', task);
    // return this.http.post('/api/tasks', task);
    return of({ success: true });
  }

  updateTask(task: any): Observable<any> {
    console.log('Update task', task);
    // return this.http.put(`/api/tasks/${task.id}`, task);
    return of({ success: true });
  }

  deleteTask(id: number): Observable<any> {
    console.log('Delete task', id);
    // return this.http.delete(`/api/tasks/${id}`);
    return of({ success: true });
  }
}
