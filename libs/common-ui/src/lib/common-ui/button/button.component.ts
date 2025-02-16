import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'outlined' | 'text' = 'primary';
  @Output() action = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.action.emit();
    }
  }
}
