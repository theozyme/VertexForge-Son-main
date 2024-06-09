import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserKurumsal, List, Task } from '../interfaces/auth';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // User methods
  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/auth/register`, userDetails);
  }
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }
  login(user: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, user)
  }
  registerkurumsalUser(userKurumsalDetails: UserKurumsal) {
    return this.http.post(`${this.baseUrl}/auth/registerkurumsal`, userKurumsalDetails);
  }

  // Task methods
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task/createTask`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/updateTask/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTask/${id}`);
  }

  // List methods
  createList(list: List): Observable<List> {
    return this.http.post<List>(`${this.baseUrl}/list/createList`, list);
  }

  getList(id: number): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/list/getList/${id}`);
  }

  updateList(list: List): Observable<List> {
    return this.http.put<List>(`${this.baseUrl}/list/updateList/${list.id}`, list);
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/list/deleteList/${id}`);
  }

}
