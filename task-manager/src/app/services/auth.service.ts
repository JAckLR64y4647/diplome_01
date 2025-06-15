// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  
  currentUser$ = this.currentUserSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    
    return of(true).pipe(
      delay(1500),
      tap(() => {
        const user: User = {
          id: 1,
          name: 'Admin User',
          email: email,
          avatar: 'https://i.pravatar.cc/150?img=3',
          role: 'admin'
        };
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        return throwError(() => new Error('Invalid credentials'));
      }),
      tap(() => this.isLoadingSubject.next(false))
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  autoLogin(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}