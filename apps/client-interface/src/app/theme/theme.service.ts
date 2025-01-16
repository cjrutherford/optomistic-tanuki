import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateColorShades, generateComplementaryColor } from './color-utils'; // Import a utility function to generate complementary color

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
    gradients: { [key: string]: string };
    complementary: string; // Add a new property for complementary color
    complementaryShades: [string, string][]; // Add a new property for complementary color shades
    complementaryGradients: { [key: string]: string }; // Add a new property for complementary gradients
  }> = new BehaviorSubject({
    background: this.theme === 'light' ? '#fff' : '#333',
    foreground: this.theme === 'light' ? '#333' : '#fff',
    accent: this.accentColor,
    accentShades: generateColorShades(this.accentColor),
    gradients: this.generateGradients(generateColorShades(this.accentColor)),
    complementary: generateComplementaryColor(this.accentColor), // Initialize with generated complementary color
    complementaryShades: generateColorShades(generateComplementaryColor(this.accentColor)), // Initialize with generated complementary shades
    complementaryGradients: this.generateGradients(generateColorShades(generateComplementaryColor(this.accentColor))), // Initialize with generated complementary gradients
  });

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    this.theme$.next(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.setProperty('--background-color', theme === 'light' ? '#fff' : '#333');
    document.documentElement.style.setProperty('--foreground-color', theme === 'light' ? '#333' : '#fff');
    const gradients = this.generateGradients(generateColorShades(this.accentColor));
    this.applyGradientsToDocument(gradients);
    const complementaryGradients = this.generateGradients(generateColorShades(generateComplementaryColor(this.accentColor)));
    this.applyGradientsToDocument(complementaryGradients, 'complementary');
    this.themeColors.next({
      background: theme === 'light' ? '#fff' : '#333',
      foreground: theme === 'light' ? '#333' : '#fff',
      accent: this.accentColor,
      accentShades: generateColorShades(this.accentColor),
      gradients,
      complementary: generateComplementaryColor(this.accentColor), // Update with generated complementary color
      complementaryShades: generateColorShades(generateComplementaryColor(this.accentColor)), // Update with generated complementary shades
      complementaryGradients, // Update with generated complementary gradients
    });
    this.theme$.next(theme);
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
    const gradients = this.generateGradients(shades);
    this.applyGradientsToDocument(gradients);
    const complementaryColor = generateComplementaryColor(color);
    const complementaryShades = generateColorShades(complementaryColor);
    const complementaryGradients = this.generateGradients(complementaryShades);
    this.applyGradientsToDocument(complementaryGradients, 'complementary');
    complementaryShades.forEach(([index, shade]) => {
      document.documentElement.style.setProperty(`--complementary-shade-${index}`, shade);
    });
    document.documentElement.style.setProperty('--complementary-color', complementaryColor);
    localStorage.setItem('complementaryColor', complementaryColor);
    localStorage.setItem('complementaryShades', JSON.stringify(complementaryShades)); // Store complementary shades in local storage
    this.themeColors.next({
      background: this.theme === 'light' ? '#fff' : '#333',
      foreground: this.theme === 'light' ? '#333' : '#fff',
      accent: color,
      accentShades: shades,
      gradients,
      complementary: complementaryColor, // Update with generated complementary color
      complementaryShades, // Update with generated complementary shades
      complementaryGradients, // Update with generated complementary gradients
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
    const savedAccentShades = localStorage.getItem('accentShades') ? JSON.parse(localStorage.getItem('accentShades')!) : generateColorShades(savedAccentColor);
    const savedComplementaryColor = localStorage.getItem('complementaryColor') || generateComplementaryColor(savedAccentColor);
    const savedComplementaryShades = localStorage.getItem('complementaryShades') ? JSON.parse(localStorage.getItem('complementaryShades')!) : generateColorShades(savedComplementaryColor);
    const savedComplementaryGradients = this.generateGradients(savedComplementaryShades);
    this.applyGradientsToDocument(savedComplementaryGradients, 'complementary');
    if (savedTheme) {
      this.theme = savedTheme;
      this.theme$.next(savedTheme);
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
        const gradients = this.generateGradients(shades);
        this.applyGradientsToDocument(gradients);
        const complementaryShades: [string, string][] = savedComplementaryShades;
        complementaryShades.forEach(([index, shade]) => {
          document.documentElement.style.setProperty(`--complementary-shade-${index}`, shade);
        });
        document.documentElement.style.setProperty('--complementary-color', savedComplementaryColor);
        this.themeColors.next({
          background: this.theme === 'light' ? '#fff' : '#333',
          foreground: this.theme === 'light' ? '#333' : '#fff',
          accent: savedAccentColor,
          accentShades: shades,
          gradients,
          complementary: savedComplementaryColor, // Update with saved complementary color
          complementaryShades, // Update with saved complementary shades
          complementaryGradients: savedComplementaryGradients, // Update with saved complementary gradients
        });
      } else {
        this.setAccentColor(savedAccentColor);
      }
    } else {
      const gradients = this.generateGradients(generateColorShades(this.accentColor));
      this.applyGradientsToDocument(gradients);
      this.themeColors.next({
        background: this.theme === 'light' ? '#fff' : '#333',
        foreground: this.theme === 'light' ? '#333' : '#fff',
        accent: this.accentColor,
        accentShades: generateColorShades(this.accentColor),
        gradients,
        complementary: generateComplementaryColor(this.accentColor), // Initialize with generated complementary color
        complementaryShades: generateColorShades(generateComplementaryColor(this.accentColor)), // Initialize with generated complementary shades
        complementaryGradients: this.generateGradients(generateColorShades(generateComplementaryColor(this.accentColor))), // Initialize with generated complementary gradients
      });
    }
  }

  private generateGradients(shades: [string, string][]): { [key: string]: string } {
    const cycles = Array.from({ length: 5 }, (_, i) => i);
    return {
      light: `linear-gradient(135deg, ${shades[0][1]}, ${shades[1][1]}, ${shades[2][1]}, ${shades[3][1]}, ${shades[4][1]})`,
      dark: `linear-gradient(135deg, ${shades[5][1]}, ${shades[6][1]}, ${shades[7][1]}, ${shades[8][1]}, ${shades[9][1]})`,
      fastCycle: `linear-gradient(45deg, ${cycles.map(_ => shades.map(([_, shade]) => shade)).join(', ')})`,
    };
  }

  private applyGradientsToDocument(gradients: { [key: string]: string }, prefix = '') {
    Object.keys(gradients).forEach(key => {
      document.documentElement.style.setProperty(`--${prefix ? `${prefix}-` : ''}gradient-${key}`, gradients[key]);
    });
  }
}