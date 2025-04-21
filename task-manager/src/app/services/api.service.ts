import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://r9j9iupnri.execute-api.eu-north-1.amazonaws.com/verson-1-0';

  constructor(private http: HttpClient) {}

  getProjectAssignees(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GET-project-assignees-all`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GET-roles-all`);
  }

  getPriorities(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/priorities`);
  }

  getStatuses(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/statuses`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GET-users-all`);
  }
}
