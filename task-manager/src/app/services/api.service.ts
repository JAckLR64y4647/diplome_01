import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MOCK_DATA } from '../mocks/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): Observable<any> {
    const user = MOCK_DATA.users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Мок-вход выполнен:', user);
      return of({ message: 'Login successful', user });
    } else {
      return throwError(() => new Error('Неверный email или пароль'));
    }
  }

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    const exists = MOCK_DATA.users.some(u => u.email === userData.email);
    if (exists) {
      return throwError(() => new Error('Пользователь с таким email уже существует'));
    }

    const newUser = {
      user_id: MOCK_DATA.users.length + 1,
      login: userData.email.split('@')[0],
      surname: '',
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role_id: 2
    };

    MOCK_DATA.users.push(newUser);
    console.log('Мок-регистрация нового пользователя:', newUser);

    return of({ message: 'Registration successful', user: newUser });
  }
}
