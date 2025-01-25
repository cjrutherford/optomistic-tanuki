// background-picker.component.ts
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-background-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input type="color" [(ngModel)]="backgroundColor" (change)="onBackgroundChange()" />
    <input type="color" [(ngModel)]="textColor" (change)="onTextColorChange()" />
  `,
})
export class BackgroundPickerComponent {
  @Output() backgroundChange = new EventEmitter<string>();
  @Output() textColorChange = new EventEmitter<string>();
  backgroundColor = '#ffffff';
  textColor = '#000000';

  onBackgroundChange() {
    this.backgroundChange.emit(this.backgroundColor);
  }

  onTextColorChange() {
    this.textColorChange.emit(this.textColor);
  }
}