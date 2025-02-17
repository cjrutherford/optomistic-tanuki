import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() columns?: number;
  @Input() rows?: number;

  gridTemplateRows: string = '';
  gridTemplateColumns: string = '';
  renderEmpty: boolean = false;

  ngOnInit() {
    if (this.columns === 0 || this.rows === 0) {
      this.renderEmpty = true;
      return;
    }

    if (this.columns) {
      this.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    }

    if (this.rows) {
      this.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    }
  }
}
