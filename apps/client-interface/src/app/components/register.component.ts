import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../theme/theme.service';
import { AuthenticationService } from '../authentication.service';
import { RegisterRequest } from '@optomistic-tanuki/libs/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  providers: [AuthenticationService], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  theme: 'light' | 'dark';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly themeService:ThemeService, private readonly authenticationService: AuthenticationService, private readonly router: Router) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmation: [''],
      bio: ['']
    });
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  onSubmit() {
    const formValue = this.registerForm.value;
    const registerRequest: RegisterRequest = {
      email: formValue.email,
      password: formValue.password,
      fn: formValue.firstName,
      ln: formValue.lastName,
      bio: formValue.bio,
      confirm: formValue.confirmation
    };
    this.authenticationService.register(registerRequest).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
