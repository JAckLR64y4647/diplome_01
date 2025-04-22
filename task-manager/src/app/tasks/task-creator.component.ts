import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['design', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const task: Task = {
        id: `KAN-${Math.floor(Math.random() * 1000)}`,
        ...this.form.value
      };
      this.taskCreated.emit(task);
      this.form.reset({ priority: 'medium', status: 'design' });
    }
  }
}
