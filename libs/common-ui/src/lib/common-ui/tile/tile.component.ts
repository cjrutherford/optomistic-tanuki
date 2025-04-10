import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
})
export class TileComponent {}
