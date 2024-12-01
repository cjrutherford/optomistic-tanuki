import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { generateColorShades } from './color-utils'; // Import a utility function to generate color shades

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';
  private accentColor: string = '#3f51b5';
  private themeColors: BehaviorSubject<{
    background: string;
    foreground: string;
    accent: string;
    accentShades: [string, string][]; // Add a new property for accent color shades
  }> = new BehaviorSubject({
    background: this.theme === 'light' ? '#fff' : '#333',
    foreground: this.theme === 'light' ? '#333' : '#fff',
    accent: this.accentColor,
    accentShades: generateColorShades(this.accentColor), // Initialize with generated shades
  });

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.style.setProperty('--background-color', theme === 'light' ? '#fff' : '#333');
    document.documentElement.style.setProperty('--foreground-color', theme === 'light' ? '#333' : '#fff');
    this.themeColors.next({
      background: theme === 'light' ? '#fff' : '#333',
      foreground: theme === 'light' ? '#333' : '#fff',
      accent: this.accentColor,
      accentShades: generateColorShades(this.accentColor), // Update with generated shades
    });
  }

  setAccentColor(color: string) {
    this.accentColor = color;
    const shades = generateColorShades(color);
    shades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--accent-shade-${index}`, shade);
    });
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
    localStorage.setItem('accentShades', JSON.stringify(shades)); // Store shades in local storage
    this.themeColors.next({
      background: this.theme === 'light' ? '#fff' : '#333',
      foreground: this.theme === 'light' ? '#333' : '#fff',
      accent: color,
      accentShades: shades, // Update with generated shades
    });
  }

  getTheme(): 'light' | 'dark' {
    return this.theme;
  }

  getAccentColor(): string {
    return this.accentColor;
  }
  
  get themeColors$() {
    return this.themeColors.asObservable();
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    const savedAccentColor = localStorage.getItem('accentColor') || '#3f51b5';
    const savedAccentShades = !!localStorage.getItem('accentShades') ? JSON.parse(localStorage.getItem('accentShades')!) : generateColorShades(savedAccentColor);
    if (savedTheme) {
      this.theme = savedTheme;
      document.documentElement.style.setProperty('--background-color', savedTheme === 'light' ? '#fff' : '#333');
      document.documentElement.style.setProperty('--foreground-color', savedTheme === 'light' ? '#333' : '#fff');
    }
    if (savedAccentColor) {
      this.accentColor = savedAccentColor;
      if (savedAccentShades) {
        const shades: [string, string][] = savedAccentShades;
      shades.forEach(([index, shade]) => {
          document.documentElement.style.setProperty(`--accent-shade-${index}`, shade);
        });
        this.themeColors.next({
          background: this.theme === 'light' ? '#fff' : '#333',
          foreground: this.theme === 'light' ? '#333' : '#fff',
          accent: savedAccentColor,
          accentShades: shades,
        });
      } else {
        this.setAccentColor(savedAccentColor);
      }
    } else {
      this.themeColors.next({
        background: this.theme === 'light' ? '#fff' : '#333',
        foreground: this.theme === 'light' ? '#333' : '#fff',
        accent: this.accentColor,
        accentShades: generateColorShades(this.accentColor),
      });
    }
  }
}