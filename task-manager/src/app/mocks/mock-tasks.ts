import { Task } from '../model/task.model';

export const MOCK_TASKS: Task[] = [
  { id: 'KAN-1', title: 'Сделать логин', priority: 'high', status: 'design' },
  { id: 'KAN-2', title: 'Добавить фильтрацию', priority: 'medium', status: 'development' },
  { id: 'KAN-3', title: 'Протестировать оплату', priority: 'low', status: 'testing' },
];
