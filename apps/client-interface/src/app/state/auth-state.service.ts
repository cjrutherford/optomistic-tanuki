import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '@optomistic-tanuki/libs/models';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export interface UserData {
  userId: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private decodedTokenSubject = new BehaviorSubject<UserData | null>(this.getDecodedToken());
  private _isAuthenticated = false;

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  decodedToken$: Observable<UserData| null> = this.decodedTokenSubject.asObservable();

  constructor(private authService: AuthenticationService, private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setToken(token);
    }
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  login(loginRequest: LoginRequest): Promise<{data: { newToken: string }}> {
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
    localStorage.removeItem('profiles');
    localStorage.removeItem('selectedProfile');
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.decodedTokenSubject.next(null);
  }

  private getDecodedToken(): UserData | null {
    const token = localStorage.getItem('authToken');
    return token ? jwtDecode(token) : null;
  }

  getToken() {
    return this.tokenSubject.value;
  }

  getDecodedTokenValue() {
    return this.decodedTokenSubject.value;
  }
}
