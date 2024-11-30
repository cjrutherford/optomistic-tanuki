import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  }> = new BehaviorSubject({
    background: this.theme === 'light' ? '#fff' : '#333',
    foreground: this.theme === 'light' ? '#333' : '#fff',
    accent: this.accentColor,
  });

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.documentElement.style.setProperty('--background-color', theme === 'light' ? '#fff' : '#333');
    document.documentElement.style.setProperty('--foreground-color', theme === 'light' ? '#333' : '#fff');
    this.themeColors.next({
      background: theme === 'light' ? '#fff' : '#333',
      foreground: theme === 'light' ? '#333' : '#fff',
      accent: this.accentColor,
    });
  }

  setAccentColor(color: string) {
    this.accentColor = color;
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
    this.themeColors.next({
      background: this.theme === 'light' ? '#fff' : '#333',
      foreground: this.theme === 'light' ? '#333' : '#fff',
      accent: color,
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
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedAccentColor = localStorage.getItem('accentColor');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
    if (savedAccentColor) {
      this.setAccentColor(savedAccentColor);
    }
  }
}