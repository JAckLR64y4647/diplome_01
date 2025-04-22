import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_TASKS } from '../mocks/mock-tasks';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  columns = ['design', 'development', 'testing'];
  tasks = MOCK_TASKS;

  groupedTasks: { [key: string]: any[] } = {};

  ngOnInit() {
    this.groupedTasks = this.columns.reduce((acc, col) => {
      acc[col] = this.tasks.filter(task => task.status === col);
      return acc;
    }, {} as any);
  }
}
