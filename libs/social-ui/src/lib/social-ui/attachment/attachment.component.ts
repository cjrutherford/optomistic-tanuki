import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'lib-attachment',
  standalone: true,
  imports: [CommonModule, CardComponent, GridComponent, ButtonComponent],
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent {
  @Input() attachments: File[] = [];
  @Output() attachmentsChange = new EventEmitter<{ 
    all: File[], 
    added: File[], 
    removed: File[] 
  }>();

  private addedAttachments: File[] = [];
  private removedAttachments: File[] = [];

  addAttachment(file: File) {
    this.attachments.push(file);
    this.addedAttachments.push(file);
    this.emitChanges();
  }

  removeAttachment(attachment: File) {
    const index = this.attachments.findIndex(att => att.name === attachment.name && att.type === attachment.type);
    if (index > -1) {
      this.attachments.splice(index, 1);
      this.removedAttachments.push(attachment);
      this.emitChanges();
    }
  }

  private emitChanges() {
    this.attachmentsChange.emit({
      all: this.attachments,
      added: this.addedAttachments,
      removed: this.removedAttachments
    });
  }
}
