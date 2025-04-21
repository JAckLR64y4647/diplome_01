import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['../ui/task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: any = null;
  @Output() close = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['medium', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const data = { ...this.task, ...this.taskForm.value };
      const request = this.task ? this.taskService.updateTask(data) : this.taskService.createTask(data);
      request.subscribe(() => this.close.emit());
    }
  }
}
