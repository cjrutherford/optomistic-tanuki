import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '@optomistic-tanuki/libs/models';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private _isAuthenticated = false;

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private authService: AuthenticationService, private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  login(loginRequest: LoginRequest): Promise<any> {
    return this.authService.login(loginRequest).then(response => {
      const token = response.data.newToken;
      this.setToken(token);
      return response;
    });
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
    this.isAuthenticatedSubject.next(true);
    this._isAuthenticated = true;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
