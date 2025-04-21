import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('Login with', email);
    // return this.http.post('/api/login', { email, password });
    return of({ token: 'demo-token' });
  }

  register(userData: any): Observable<any> {
    console.log('Register with', userData);
    // return this.http.post('/api/register', userData);
    return of({ success: true });
  }

  logout(): void {
    console.log('Logout');
    // remove token from storage
  }
}