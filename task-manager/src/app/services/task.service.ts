import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  task_id: number;
  title: string;
  description: string;
  status_id: number;
  priority_id: number;
  assignee_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      task_id: 1,
      title: 'Сделать логин',
      description: 'Реализовать форму входа в систему',
      status_id: 1,
      priority_id: 1,
      assignee_id: 1
    },
    {
      task_id: 2,
      title: 'Добавить фильтрацию',
      description: 'Поиск по задачам и фильтрация по статусу',
      status_id: 2,
      priority_id: 2,
      assignee_id: 2
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return of(this.tasks.find(t => t.task_id === id));
  }

  createTask(task: Task): Observable<Task> {
    task.task_id = this.tasks.length + 1;
    this.tasks.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.task_id === task.task_id);
    if (index !== -1) this.tasks[index] = task;
    return of(task);
  }

  deleteTask(id: number): Observable<boolean> {
    this.tasks = this.tasks.filter(t => t.task_id !== id);
    return of(true);
  }
}
