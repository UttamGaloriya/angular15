import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap, throwError } from 'rxjs';
import { User, UserData } from '../shared/all-interface';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000'
  private usersUrl = 'http://localhost:3000/users'


  userData = new BehaviorSubject<any>({})

  constructor(private http: HttpClient, private router: Router, private snackBar: SnackbarService) {
    let id = localStorage.getItem('userId')
    if (id != null) {
      this.getUSer(id).subscribe((res) => { this.userData.next(res) })
    } else {
      localStorage.removeItem('token')
    }
  }

  login(user: User): Observable<any | null> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users: User[]) => users.find((u: any) => u.username === user.username && u.password === user.password || null)),
      tap((data: any) => { this.addToken(data), this.userData.next(data), console.log(this.userData), localStorage.setItem('userId', data.id) }),
    );
  }

  update(user: UserData, id: number): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, user).pipe(tap((res) => { this.userData.next(res), this.snackBar.showSnackBar(`data Update successfully`, 'ok', 'success') }))
  }

  signUp(user: UserData): Observable<any> {
    return this.http.post(`${this.url}/users`, user).pipe((tap((res) => { this.snackBar.showSnackBar(`data add successfully`, 'ok', 'success') })))
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

  getUSer(id: number | string): Observable<any> {
    return this.http.get<UserData>(`${this.url}/users/${id}`)
  }
  get getToken() {
    const token = localStorage.getItem("token") || null;
    return token
  }

  removeToken() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/account/login')
  }

  getUserProfile(): Observable<any> {
    return this.userData.pipe(
      switchMap((data: any) => {
        return [data]
      })
    )
  }

  spyTry(): number {
    return 1
  }
}
