import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['../ui/task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedPriority = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  filter(priority: string): void {
    this.selectedPriority = priority;
  }

  get filteredTasks(): any[] {
    return this.selectedPriority
      ? this.tasks.filter(t => t.priority === this.selectedPriority)
      : this.tasks;
  }
}
