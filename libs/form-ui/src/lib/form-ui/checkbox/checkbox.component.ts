import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() value: boolean = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.checked;
    this.change.emit(this.value);
  }
}
