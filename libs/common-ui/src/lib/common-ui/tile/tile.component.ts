import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Themeable, ThemeColors } from '@optomistic-tanuki/theme-ui';

@Component({
  selector: 'otui-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tile">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
  host: {
    'class.theme': 'theme',
    '[style.--background]': 'background',
    '[style.--foreground]': 'foreground',
    '[style.--accent]': 'accent',
    '[style.--complement]': 'complement',
    '[style.--border-color]': 'borderColor',
    '[style.--border-gradient]': 'borderGradient',
    '[style.--transition-duration]': 'transitionDuration',
  }
})
export class TileComponent extends Themeable{

  override applyTheme(colors: ThemeColors): void {
    this.background = `linear-gradient(to bottom, ${colors.background}, ${colors.accent}`;
    this.foreground = colors.foreground;
    this.accent = colors.accent;
    this.complement = colors.complementary;
    this.borderGradient = colors.accentGradients['light'];
    this.borderColor = colors.complementaryShades[2][1];
    this.transitionDuration = '0.3s';
  }
}
