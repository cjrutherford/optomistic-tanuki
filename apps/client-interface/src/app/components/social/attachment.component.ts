// attachment-upload.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-attachment-upload',
  standalone: true,
  template: `
    <input type="file" (change)="onFileChange($event)" multiple />
  `,
})
export class AttachmentComponent {
  @Output() filesChange = new EventEmitter<File[]>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files);
      this.filesChange.emit(filesArray);
    }
  }
}