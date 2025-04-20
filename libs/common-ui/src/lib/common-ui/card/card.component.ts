import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Themeable, ThemeColors } from '@optomistic-tanuki/theme-ui';

@Component({
  selector: 'otui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
export class CardComponent extends Themeable{
  override applyTheme(colors: ThemeColors): void {
    this.background = `linear-gradient(to bottom, ${colors.background}, ${colors.accent}`;
    this.foreground = colors.foreground;
    this.accent = colors.accent;
    this.complement = colors.complementary;
  }

}
