import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isLoading = true;
  isEditing = false;
  editedTask: Partial<Task> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(taskId);
  }

  loadTask(taskId: number) {
    this.isLoading = true;
    this.taskService.getTask(taskId).subscribe({
      next: task => {
        this.task = task;
        this.editedTask = { ...task };
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    if (!this.task) return;
    
    this.isLoading = true;
    // В реальном приложении:
    // this.taskService.updateTask(this.task.id, this.editedTask).subscribe(...)
    
    // Для демо:
    setTimeout(() => {
      if (this.task) {
        Object.assign(this.task, this.editedTask);
      }
      this.isEditing = false;
      this.isLoading = false;
    }, 800);
  }

  cancelEditing() {
    if (this.task) {
      this.editedTask = { ...this.task };
    }
    this.isEditing = false;
  }
}