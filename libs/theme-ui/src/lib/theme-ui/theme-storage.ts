export function loadTheme(): { theme: 'light' | 'dark'; accentColor: string } {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  const savedAccentColor = localStorage.getItem('accentColor') || '#3f51b5';
  return { theme: savedTheme, accentColor: savedAccentColor };
}

export function saveTheme(theme: 'light' | 'dark', accentColor: string): void {
  localStorage.setItem('theme', theme);
  localStorage.setItem('accentColor', accentColor);
}