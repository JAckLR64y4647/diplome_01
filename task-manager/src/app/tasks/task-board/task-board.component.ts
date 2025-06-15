import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../model/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../loading-spinner.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, LoadingSpinnerComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  columns = [
    { id: 'design', title: 'Design' },
    { id: 'development', title: 'Development' },
    { id: 'testing', title: 'Testing' }
  ];
  
  groupedTasks: { [key: string]: Task[] } = {
    design: [],
    development: [],
    testing: []
  };
  isLoading = true;
  isCreatingTask = false;
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: tasks => {
        this.groupTasks(tasks);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  groupTasks(tasks: Task[]) {
    this.columns.forEach(col => {
      this.groupedTasks[col.id] = tasks.filter(task => task.status === col.id);
    });
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const task = event.container.data[event.currentIndex];
      const newStatus = event.container.id as TaskStatus;
      
      this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
        error: () => this.loadTasks() // Откат при ошибке
      });
    }
  }

  createTask() {
    if (!this.newTaskTitle.trim()) return;
    
    this.isCreatingTask = true;
    this.taskService.createTask({
      title: this.newTaskTitle,
      status: 'design',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: new Date().toISOString()
    }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.isCreatingTask = false;
        this.loadTasks();
      },
      error: () => {
        this.isCreatingTask = false;
      }
    });
  }

  openTaskDetail(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }
}