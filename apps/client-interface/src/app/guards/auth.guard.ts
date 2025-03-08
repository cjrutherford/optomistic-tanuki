import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../state/auth-state.service';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;

  constructor(
    @Inject(AuthStateService) private authStateService: AuthStateService, 
    private router: Router,
    private readonly profileService: ProfileService,
  ) {
    this.authStateService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

  }

  canActivate(): boolean {
    if (this.isAuthenticated) {
      const selectedProfile = this.profileService.getCurrentUserProfile();
      // if(!selectedProfile) {
      //   this.router.navigate(['/profile']);
      // }
      return true;
    }
    // If the user is not authenticated, navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
