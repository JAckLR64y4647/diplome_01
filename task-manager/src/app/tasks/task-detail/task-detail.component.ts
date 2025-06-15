import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { LoadingSpinnerComponent } from '../../loading-spinner.component';
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
    this.taskService.getTaskById(taskId).subscribe({  // Changed from getTask to getTaskById
      next: (task: Task) => {
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
    this.taskService.updateTask(this.task.id, this.editedTask).subscribe({  // No need to cast as Task since updateTask accepts Partial<Task>
      next: (updatedTask: Task) => {
        this.task = updatedTask;
        this.isEditing = false;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancelEditing() {
    if (this.task) {
      this.editedTask = { ...this.task };
    }
    this.isEditing = false;
  }
}