import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'api/projects'; // Будет заменено на реальный API
  private projects: Project[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  /**
   * Получить список всех проектов
   */
  getProjects(): Observable<Project[]> {
    // В реальном приложении:
    // return this.http.get<Project[]>(this.apiUrl);
    
    // Для демо:
    return of(this.projects).pipe(
      delay(500), // Имитация задержки сети
      tap(projects => console.log('Fetched projects:', projects))
    );
  }

  /**
   * Получить проект по ID
   */
  getProjectById(id: number): Observable<Project> {
    const project = this.projects.find(p => p.id === id);
    return project 
      ? of(project).pipe(delay(300))
      : throwError(() => new Error(`Project with id ${id} not found`));
  }

  /**
   * Создать новый проект
   */
  createProject(projectData: Partial<Project>): Observable<Project> {
    const newProject: Project = {
      id: this.generateId(),
      name: projectData.name || 'New Project',
      description: projectData.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: 'Current User',
      members: ['Current User'],
      progress: 0,
      ...projectData
    };

    this.projects.push(newProject);
    return of(newProject).pipe(delay(800));
  }

  /**
   * Обновить проект
   */
  updateProject(id: number, updates: Partial<Project>): Observable<Project> {
    const index = this.projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`Project with id ${id} not found`));
    }

    const updatedProject = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date()
    };

    this.projects[index] = updatedProject;
    return of(updatedProject).pipe(delay(600));
  }

  /**
   * Удалить проект
   */
  deleteProject(id: number): Observable<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`Project with id ${id} not found`));
    }

    this.projects.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  /**
   * Получить последние проекты (для dashboard)
   */
  getRecentProjects(limit = 5): Observable<Project[]> {
    const sorted = [...this.projects]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return of(sorted.slice(0, limit)).pipe(delay(300));
  }

  /**
   * Инициализация мок-данных для демо
   */
  private initializeMockData(): void {
    this.projects = [
      {
        id: 1,
        name: 'Web Application',
        description: 'Разработка веб-приложения для управления задачами',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-06-10'),
        owner: 'John Doe',
        members: ['John Doe', 'Jane Smith'],
        progress: 75
      },
      {
        id: 2,
        name: 'Mobile App',
        description: 'Мобильное приложение для iOS и Android',
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date('2023-06-05'),
        owner: 'Jane Smith',
        members: ['Jane Smith', 'Mike Johnson'],
        progress: 30
      },
      {
        id: 3,
        name: 'API Development',
        description: 'Backend API для интеграции с клиентскими приложениями',
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2023-06-12'),
        owner: 'Mike Johnson',
        members: ['Mike Johnson', 'John Doe'],
        progress: 90
      },
      {
        id: 4,
        name: 'Database Optimization',
        description: 'Оптимизация производительности базы данных',
        createdAt: new Date('2023-04-05'),
        updatedAt: new Date('2023-06-08'),
        owner: 'John Doe',
        members: ['John Doe'],
        progress: 45
      },
      {
        id: 5,
        name: 'UI/UX Redesign',
        description: 'Редизайн пользовательского интерфейса',
        createdAt: new Date('2023-05-01'),
        updatedAt: new Date('2023-06-11'),
        owner: 'Jane Smith',
        members: ['Jane Smith', 'Anna Lee'],
        progress: 60
      }
    ];
  }

  /**
   * Генерация нового ID для проекта
   */
  private generateId(): number {
    return this.projects.length > 0 
      ? Math.max(...this.projects.map(p => p.id)) + 1 
      : 1;
  }
}