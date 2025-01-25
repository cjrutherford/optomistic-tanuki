// tagging.component.ts
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tagging',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="tagInput"
      (keyup.enter)="addTag()"
      placeholder="Add a tag"
    />
    <div *ngFor="let tag of tags">
      {{ tag }} <button (click)="removeTag(tag)">x</button>
    </div>
  `,
})
export class TaggingComponent {
  @Output() tagsChange = new EventEmitter<string[]>();
  tagInput = '';
  tags: string[] = [];

  addTag() {
    if (this.tagInput.trim()) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
      this.tagsChange.emit(this.tags);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
    this.tagsChange.emit(this.tags);
  }
}