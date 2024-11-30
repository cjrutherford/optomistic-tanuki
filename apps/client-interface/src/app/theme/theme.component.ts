import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ToggleComponent {
  theme: 'light' | 'dark';
  accentColor: string;
  background: string;
  foreground: string;
  accent: string;
  themeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.accentColor = this.themeService.getAccentColor();
    this.themeService.themeColors$.subscribe((colors) => {
      this.background = colors.background;
      this.foreground = colors.foreground;
      this.accent = colors.accent;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.theme);
  }

  updateAccentColor() {
    this.themeService.setAccentColor(this.accentColor);
  }
}