import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../state/auth-state.service';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  showPanel = false;
  user: any;
  isLoggedIn: boolean;
  constructor(private readonly authState: AuthStateService, private readonly router: Router) {}

  ngOnInit() {
    combineLatest([
      this.authState.isAuthenticated$,
      this.authState.decodedToken$
    ]).subscribe(([isLoggedIn, user]) => {
      this.isLoggedIn = isLoggedIn;
      this.user = user;
      console.log(this.user);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authState.logout();
    this.router.navigate(['/login']);
  }
}
