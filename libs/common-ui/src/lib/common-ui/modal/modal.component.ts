import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'otui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() heading: string = '';
  @Input() mode: 'sidebar' | 'trough' | 'standard-modal' | 'captive-modal' = 'standard-modal';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
