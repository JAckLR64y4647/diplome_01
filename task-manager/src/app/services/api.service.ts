import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://';

  constructor(private http: HttpClient) {}

  // Метод для логина
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/GET-roles-all?email=${email}&password=${password}`;

    return this.http.get(url).pipe(
      catchError(err => {
        return throwError(() => new Error('Неверный email или пароль'));
      })
    );
  }

  // Метод для регистрации
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/GET-roles-all?name=${userData.name}&email=${userData.email}&password=${userData.password}`;

    return this.http.get(url).pipe(
      catchError(err => {
        return throwError(() => new Error('Пользователь с таким email уже существует'));
      })
    );
  }

}
