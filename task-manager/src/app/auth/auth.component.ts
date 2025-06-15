import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.createForm();
  }

  createForm(): FormGroup {
    if (this.isLoginMode) {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    } else {
      return this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.createForm();
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.authForm.value;

    const authObservable = this.isLoginMode
      ? this.authService.login(formValue.email, formValue.password)
      : this.authService.register(formValue);

    authObservable.pipe(
      catchError((err) => {
        this.errorMessage = err.error?.message || 'An error occurred';
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(res => {
      this.isLoading = false;
      if (res) {
        const redirectPath = this.isLoginMode ? '/tasks' : '/login';
        this.router.navigate([redirectPath]);
      }
    });
  }

  get formTitle() {
    return this.isLoginMode ? 'Login' : 'Register';
  }

  get switchModeText() {
    return this.isLoginMode 
      ? 'Need an account? Register here' 
      : 'Already have an account? Login here';
  }
}