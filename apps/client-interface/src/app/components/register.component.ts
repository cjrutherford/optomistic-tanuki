import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  theme: 'light' | 'dark';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly themeService:ThemeService) {
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
    console.log(this.registerForm.value);
  }
}
