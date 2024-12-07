import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ThemeService],
})
export class LoginComponent {
  themeSub: Subscription;
  loginForm: FormGroup;
  themeStyles: {
    backgroundColor: string;
    color: string;
    border: string;
  };

  constructor(private fb: FormBuilder, private readonly themeService: ThemeService) {
    this.themeService.themeColors$.subscribe((colors) => {
      this.themeStyles = {
        backgroundColor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.accent}`,
      }
    });
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      mfaToken: ['']
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
