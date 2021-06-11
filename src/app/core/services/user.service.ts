import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: User | null = null;
  private uri = environment.apiUrl + "users";

  loggedIn$ = new Subject<string>();
  loggedOut$ = new Subject<string>();

  message$ = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  login(user : User) {
    this.http.post<User>(`${this.uri}/login`, user)
    .subscribe(
      data => {
        this.loggedInUser = data;
        this.loggedIn$.next(this.loggedInUser.username);
        this.message$.next(`${data.username} is ingelogd`);
        localStorage.setItem('loggedInUser', JSON.stringify(data));
      },
      error => {
        console.log(error);
        this.message$.next(`Inloggen mislukt. ${error.statusText}`)
      }
    );
  }

  logout(): void {
    this.loggedInUser = null;
    this.loggedOut$.next();
  }
}
