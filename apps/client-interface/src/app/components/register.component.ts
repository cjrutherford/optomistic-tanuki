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
import { RegisterBlockComponent } from '@optomistic-tanuki/auth-ui';
import { filter } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, RegisterBlockComponent],
  providers: [AuthenticationService], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  theme: 'light' | 'dark';

  constructor(private readonly themeService:ThemeService, private readonly authenticationService: AuthenticationService, private readonly router: Router) {
    this.themeService.theme$().pipe(filter(x => !!x)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  onSubmit($event: SubmitEvent) {
    console.log("🚀 ~ RegisterComponent ~ onSubmit ~ event:", event)
    const formValue = $event as any;
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
