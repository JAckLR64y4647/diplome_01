// project.model.ts
export interface Project {
  id: number;                   // Уникальный идентификатор проекта
  name: string;                 // Название проекта
  description: string;          // Описание проекта
  createdAt: Date;              // Дата создания
  updatedAt: Date;              // Дата последнего обновления
  owner: string;                // Владелец проекта (username)
  members: string[];            // Участники проекта
  progress: number;             // Прогресс выполнения (0-100)
  status?: ProjectStatus;       // Текущий статус проекта
  tags?: ProjectTag[];          // Теги/метки проекта
  repositoryUrl?: string;       // Ссылка на репозиторий
  settings?: ProjectSettings;   // Настройки проекта
}

// Типы статусов проекта
export type ProjectStatus = 
  | 'planning' 
  | 'active' 
  | 'on_hold' 
  | 'completed' 
  | 'archived';

// Интерфейс тега проекта
export interface ProjectTag {
  id: number;
  name: string;
  color: string; // HEX-цвет для отображения
}

// Настройки проекта
export interface ProjectSettings {
  visibility: 'private' | 'public';
  features: {
    wiki: boolean;
    issues: boolean;
    mergeRequests: boolean;
  };
  permissions: {
    edit: 'owner' | 'members' | 'all';
    view: 'members' | 'all';
  };
}

// Дополнительные типы для работы с проектами

// Тип для создания нового проекта
export type ProjectCreateData = Omit<Project, 
  'id' | 'createdAt' | 'updatedAt' | 'progress' | 'owner' | 'members'
> & {
  initializeWith?: {
    readme?: boolean;
    license?: boolean;
    gitignore?: boolean;
  };
};

// Тип для обновления проекта
export type ProjectUpdateData = Partial<Omit<Project, 
  'id' | 'createdAt' | 'updatedAt' | 'owner'
>>;

// Статистика по проекту
export interface ProjectStats {
  tasks: {
    total: number;
    completed: number;
  };
  mergeRequests: {
    open: number;
    merged: number;
  };
  members: number;
  lastActivity: Date;
}

// Упрощенная версия проекта для списков
export interface ProjectListItem {
  id: number;
  name: string;
  description: string;
  progress: number;
  updatedAt: Date;
  owner: string;
}