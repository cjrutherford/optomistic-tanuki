import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ot-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="heading" [ngStyle]="{'font-size': size}">{{ text }}</span>
  `,
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  @Input() text: string = '';
  @Input() size: string = '1em';
}
