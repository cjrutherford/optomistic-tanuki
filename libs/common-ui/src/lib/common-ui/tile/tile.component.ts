import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="tile">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {}
