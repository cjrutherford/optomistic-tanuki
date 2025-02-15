import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AttachmentDto } from '../../attachment.service';

@Component({
  selector: 'app-attachment',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent {
  @Output() attachmentsChanged: EventEmitter<Partial<AttachmentDto>[]> = new EventEmitter<Partial<AttachmentDto>[]>();
  @Input() existingAttachments: Partial<AttachmentDto>[] = [];
  file: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  attachments: Partial<AttachmentDto>[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.file);

      if (this.file) {
        const attachment: Partial<AttachmentDto> = {
          name: this.file.name,
          type: this.file.type,
          url: this.previewUrl as string
        };
        this.attachments.push(attachment);
        this.attachmentsChanged.emit(this.attachments);
      }
    }
  }

  getAttachments(): Partial<AttachmentDto>[] {
    return this.attachments;
  }

  processAttachments(): void {
    const allAttachments = [...this.existingAttachments, ...this.attachments];
    this.attachmentsChanged.emit(allAttachments);
  }
}
