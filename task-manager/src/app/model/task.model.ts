export type TaskStatus = 'design' | 'development' | 'testing';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
}