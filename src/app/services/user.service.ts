import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { User } from '../shared/all-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000'
  private usersUrl = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any | null> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users: User[]) => users.find((u: any) => u.username === user.username && u.password === user.password || null))
    );
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.url}/users`, user)
  }

}
