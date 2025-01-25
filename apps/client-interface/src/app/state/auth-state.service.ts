import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '@optomistic-tanuki/libs/models';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private decodedTokenSubject = new BehaviorSubject<any>(this.getDecodedToken());
  private _isAuthenticated = false;

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  decodedToken$: Observable<any> = this.decodedTokenSubject.asObservable();

  constructor(private authService: AuthenticationService, private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setToken(token);
    }
  }

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
    this.decodedTokenSubject.next(this.getDecodedToken());
    this._isAuthenticated = true;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.decodedTokenSubject.next(null);
  }

  private getDecodedToken() {
    const token = localStorage.getItem('authToken');
    return token ? jwtDecode(token) : null;
  }

  getToken() {
    return this.tokenSubject.value;
  }
}
