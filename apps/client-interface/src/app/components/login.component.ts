import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme/theme.service';
import { AuthStateService } from '../state/auth-state.service';
import { LoginRequest } from '@optomistic-tanuki/libs/models';
import { LoginBlockComponent } from '@optomistic-tanuki/auth-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    LoginBlockComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ThemeService],
})
export class LoginComponent implements OnDestroy {
  themeSub: Subscription;
  themeStyles: {
    backgroundColor: string;
    color: string;
    border: string;
  };

  constructor(private fb: FormBuilder, private readonly themeService: ThemeService, private readonly authStateService: AuthStateService, private readonly router: Router) {
    this.themeSub = this.themeService.themeColors$.subscribe((colors) => {
      this.themeStyles = {
        backgroundColor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.accent}`,
      }
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }

  onSubmit($event: {email: string; password: string;}) {
    const loginRequest: LoginRequest = {
      email: $event.email,
      password: $event.password,
    }
    this.authStateService.login(loginRequest).then((response) => {
      console.log(response);
      this.authStateService.setToken(response.data.newToken);
      if (this.authStateService.isAuthenticated) {
        this.router.navigate(['/feed']);
      }
    }).catch(err => {
      console.error(err);
    });
  }
}
