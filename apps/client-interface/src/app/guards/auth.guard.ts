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

  async canActivate(): Promise<boolean> {
    if (this.isAuthenticated) {
      try {
        await this.profileService.getAllProfiles();
        const selectedProfile = localStorage.getItem('selectedProfile');
        if (selectedProfile) {
          this.profileService.selectProfile(JSON.parse(selectedProfile));
        }
        return true;
      } catch (error) {
        console.error('Error fetching profiles:', error);
        return false;
      }
    }
    // If the user is not authenticated, navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
