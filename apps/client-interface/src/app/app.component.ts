import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './components/toolbar.component';
import { ThemeService } from './theme/theme.service';

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
  backgroundGradient: string; // New property

  constructor(private readonly themeService: ThemeService) {
    this.themeService.theme$.subscribe((theme) => {
      this.backgroundGradient = 'background-gradient-' + theme;
    });
  }
  title = 'client-interface';
  isNavExpanded = false;

  toggleNav() {
    console.log('toggleNav');
    this.isNavExpanded = !this.isNavExpanded;
  }
}
