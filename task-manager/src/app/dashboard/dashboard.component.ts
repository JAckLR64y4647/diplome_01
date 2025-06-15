import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../loading-spinner.component';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';

interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
}

interface DashboardData {
  projects: Project[];
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectsStats: ProjectStats = { total: 0, completed: 0, inProgress: 0 };
  recentTasks: Task[] = [];
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    forkJoin({
      projects: this.projectService.getProjects(),
      tasks: this.taskService.getTasks()
    }).subscribe({
      next: (data: DashboardData) => {
        this.projectsStats = {
          total: data.projects.length,
          completed: data.projects.filter(p => p.progress === 100).length,
          inProgress: data.projects.filter(p => p.progress > 0 && p.progress < 100).length
        };
        this.recentTasks = data.tasks.slice(0, 5);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.isLoading = false;
      }
    });
  }

  getCompletionPercentage(completed: number, total: number): number {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
}