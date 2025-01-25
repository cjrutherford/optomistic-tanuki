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

  constructor(private readonly themeService: ThemeService, private readonly authState: AuthStateService, private router: Router) {
    this.themeService.theme$.subscribe((theme) => {
      this.backgroundGradient = 'background-gradient-' + theme;
    });
    this.currentUrl$ = this.router.events.pipe(
      map(() => this.router.url)
    );
  }
  title = 'client-interface';
  isNavExpanded = false;

  toggleNav() {
    if(!this.authState.isAuthenticated) return
    else this.isNavExpanded = !this.isNavExpanded;
  }
}
