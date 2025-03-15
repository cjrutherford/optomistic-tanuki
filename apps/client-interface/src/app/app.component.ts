import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './components/toolbar.component';
import { ThemeService } from './theme/theme.service';
import { AuthStateService } from './state/auth-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';
import { ProfileSelectorComponent } from '@optomistic-tanuki/profile-ui';
import { ProfileService } from './profile.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    ToolbarComponent,
    GridComponent,
    CardComponent,
    ProfileSelectorComponent,
  ],
  providers: [ThemeService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  background: string;
  foreground: string;
  accent: string;
  backgroundGradient: string; 
  currentUrl$: Observable<string>; 
  profileService: ProfileService;
  authState: AuthStateService;

  constructor(
    private readonly themeService: ThemeService, 
    _authState: AuthStateService,
    _profileService: ProfileService,
    private router: Router
  ) {
    this.profileService = _profileService;
    this.authState = _authState;
    this.themeService.theme$.subscribe((theme) => {
      this.backgroundGradient = 'background-gradient-' + theme;
    });
    this.currentUrl$ = this.router.events.pipe(
      map(() => this.router.url)
    );
  }
  title = 'client-interface';
  isNavExpanded = false;

  ngOnInit() {
    this.profileService.getAllProfiles();
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (selectedProfile) {
      this.profileService.selectProfile(JSON.parse(selectedProfile));
    }
  }

  toggleNav() {
    if(!this.authState.isAuthenticated) return
    else this.isNavExpanded = !this.isNavExpanded;
  }
}
