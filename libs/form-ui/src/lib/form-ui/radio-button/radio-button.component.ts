import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() options: { label: string, value: any }[] = [];
  @Input() layout: 'vertical' | 'horizontal' | 'grid' = 'vertical';
  @Output() selectedValue = new EventEmitter<any>();
  selected: any;

  onSelect(value: any) {
    this.selected = value;
    this.selectedValue.emit(this.selected);
  }
}
