import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';
import { FormsModule } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { ThemeColors } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'lib-theme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
  host: {
    '[style.--background]': 'background',
    '[style.--foreground]': 'foreground',
    '[style.--border-color]': 'borderColor',
    '[style.--transition-duration]': 'transitionDuration',
    '[style.--accent-color]': 'accent',
    '[style.--complementary-color]': 'complement',
    '[class.dark]': 'theme === "dark"',
    '[class.light]': 'theme === "light"',
  }
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  theme: 'light' | 'dark';
  accentColor: string;
  background: string;
  foreground: string;
  accent: string;
  complement: string;
  borderColor: string;
  themeSubscription: Subscription;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  transitionDuration: string = '0.3s';

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.accentColor = this.themeService.getAccentColor();
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.themeColors$
      .pipe(
        filter(
          (value) =>
            !!(value && value.background && value.foreground && value.accent),
        ),
      )
      .subscribe({
        next: (colors: ThemeColors | undefined) => {
          if (!colors) {
            return;
          }
          this.background = `linear-gradient(to bottom, ${colors.background}, ${colors.accent})`;
          this.foreground = colors.foreground;
          this.accent = colors.accent;
          this.complement = colors.complementary;
          if (this.theme === 'dark') {
            this.borderColor = colors.complementaryShades[6][1];
          } else {
            this.borderColor = colors.complementaryShades[3][1];
          }
        },
      });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.theme);
  }

  updateAccentColor() {
    this.themeService.setAccentColor(this.accentColor);
  }
}