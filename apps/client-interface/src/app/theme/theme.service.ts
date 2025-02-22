import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { generateColorShades, generateComplementaryColor, generateDangerColor, generateWarningColor, generateSuccessColor } from './color-utils';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';
  private accentColor = '#3f51b5';
  theme$: BehaviorSubject<'light' | 'dark'> = new BehaviorSubject(this.theme);
  private themeColors: BehaviorSubject<{
    background: string;
    foreground: string;
    accent: string;
    accentShades: [string, string][];
    accentGradients: { [key: string]: string };
    complementary: string;
    complementaryShades: [string, string][];
    complementaryGradients: { [key: string]: string };
    success: string;
    successShades: [string, string][];
    successGradients: { [key: string]: string };
    danger: string;
    dangerShades: [string, string][];
    dangerGradients: { [key: string]: string };
    warning: string;
    warningShades: [string, string][];
    warningGradients: { [key: string]: string };
  }> = new BehaviorSubject(this.generateThemeColors());

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    this.theme$.next(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.setProperty('--background-color', theme === 'light' ? '#fff' : '#333');
    document.documentElement.style.setProperty('--foreground-color', theme === 'light' ? '#333' : '#fff');
    this.applyThemeColors();
  }

  setAccentColor(color: string) {
    this.accentColor = color;
    localStorage.setItem('accentColor', color);
    this.applyThemeColors();
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
    this.theme = savedTheme;
    this.accentColor = savedAccentColor;
    this.applyThemeColors();
  }

  private generateThemeColors() {
    const accentShades = generateColorShades(this.accentColor);
    const complementaryColor = generateComplementaryColor(this.accentColor);
    const complementaryShades = generateColorShades(complementaryColor);
    const successColor = generateSuccessColor(this.accentColor);
    const successShades = generateColorShades(successColor);
    const dangerColor = generateDangerColor(this.accentColor);
    const dangerShades = generateColorShades(dangerColor);
    const warningColor = generateWarningColor(this.accentColor);
    const warningShades = generateColorShades(warningColor);

    return {
      background: this.theme === 'light' ? '#fff' : '#333',
      foreground: this.theme === 'light' ? '#333' : '#fff',
      accent: this.accentColor,
      accentShades,
      accentGradients: this.generateGradients(accentShades),
      complementary: complementaryColor,
      complementaryShades,
      complementaryGradients: this.generateGradients(complementaryShades),
      success: successColor,
      successShades,
      successGradients: this.generateGradients(successShades),
      danger: dangerColor,
      dangerShades,
      dangerGradients: this.generateGradients(dangerShades),
      warning: warningColor,
      warningShades,
      warningGradients: this.generateGradients(warningShades),
    };
  }

  private applyThemeColors() {
    const themeColors = this.generateThemeColors();
    this.themeColors.next(themeColors);
    document.documentElement.style.setProperty('--background-color', themeColors.background);
    document.documentElement.style.setProperty('--foreground-color', themeColors.foreground);
    document.documentElement.style.setProperty('--accent-color', themeColors.accent);

    themeColors.accentShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--accent-shade-${index}`, shade);
    });
    Object.keys(themeColors.accentGradients).forEach(subKey => {
      document.documentElement.style.setProperty(`--accent-gradient-${subKey}`, themeColors.accentGradients[subKey]);
    });

    document.documentElement.style.setProperty('--complementary-color', themeColors.complementary);
    themeColors.complementaryShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--complementary-shade-${index}`, shade);
    });
    Object.keys(themeColors.complementaryGradients).forEach(subKey => {
      document.documentElement.style.setProperty(`--complementary-gradient-${subKey}`, themeColors.complementaryGradients[subKey]);
    });

    document.documentElement.style.setProperty('--success-color', themeColors.success);
    themeColors.successShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--success-shade-${index}`, shade);
    });
    Object.keys(themeColors.successGradients).forEach(subKey => {
      document.documentElement.style.setProperty(`--success-gradient-${subKey}`, themeColors.successGradients[subKey]);
    });

    document.documentElement.style.setProperty('--danger-color', themeColors.danger);
    themeColors.dangerShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--danger-shade-${index}`, shade);
    });
    Object.keys(themeColors.dangerGradients).forEach(subKey => {
      document.documentElement.style.setProperty(`--danger-gradient-${subKey}`, themeColors.dangerGradients[subKey]);
    });

    document.documentElement.style.setProperty('--warning-color', themeColors.warning);
    themeColors.warningShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--warning-shade-${index}`, shade);
    });
    Object.keys(themeColors.warningGradients).forEach(subKey => {
      document.documentElement.style.setProperty(`--warning-gradient-${subKey}`, themeColors.warningGradients[subKey]);
    });
  }

  private generateGradients(shades: [string, string][]): { [key: string]: string } {
    const cycles = Array.from({ length: 5 }, (_, i) => i);
    return {
      light: `linear-gradient(135deg, ${shades[0][1]}, ${shades[1][1]}, ${shades[2][1]}, ${shades[3][1]}, ${shades[4][1]})`,
      dark: `linear-gradient(135deg, ${shades[5][1]}, ${shades[6][1]}, ${shades[7][1]}, ${shades[8][1]}, ${shades[9][1]})`,
      fastCycle: `linear-gradient(45deg, ${cycles.map(_ => shades.map(([_, shade]) => shade)).join(', ')})`,
    };
  }
}