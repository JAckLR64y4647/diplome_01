import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service'; 
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'design' | 'development' | 'testing';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  columns = ['design', 'development', 'testing'];
  tasks$!: Observable<Task[]>;
  groupedTasks: { [key: string]: Task[] } = {};

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    
    this.tasks$.subscribe(tasks => {
      this.groupTasksByStatus(tasks);
    });
  }

  private groupTasksByStatus(tasks: Task[]) {
    this.groupedTasks = this.columns.reduce((acc, col) => {
      acc[col] = tasks.filter(task => task.status === col);
      return acc;
    }, {} as { [key: string]: Task[] });
  }
}
