import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '@optomistic-tanuki/libs/models';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private readonly http: HttpClient) { }

  isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }

  register(data: RegisterRequest) {
    return this.http.post('/api/authentication/register', data);
  } 

  login(data: LoginRequest) {
    return firstValueFrom(this.http.post<{data: { newToken: string}}>('/api/authentication/login', data));
  }

  setToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userData.next(payload);
    this.isAuthenticated.next(true);

    const expiresAt = payload.exp * 1000;
    const timeout = expiresAt - Date.now();

    setTimeout(() => {
      this.isAuthenticated.next(false);
      this.userData.next(null);
    }, timeout);
  }
}
