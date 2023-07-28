import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, throwError } from 'rxjs';
import { User, UserData } from '../shared/all-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000'
  private usersUrl = 'http://localhost:3000/users'
  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<any | null> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users: User[]) => users.find((u: any) => u.username === user.username && u.password === user.password || null)),
      tap((data: any) => { this.addToken(data) }),
    );
  }

  update(user: UserData, id: number): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, user)
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.url}/users`, user)
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/users/${id}`)
  }

  addToken(user: UserData) {
    localStorage.removeItem('token')
    if (user.type === 'admin') {
      localStorage.setItem('token', 'admin-token')
    }
    else {
      localStorage.setItem('token', 'user-token')
    }
  }

  allUser(): Observable<any> {
    return this.http.get<User[]>(`${this.url}/users`)
  }

  get getToken() {
    const token = localStorage.getItem("token") || null;
    return token
  }

  removeToken() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/account/login')
  }

}
