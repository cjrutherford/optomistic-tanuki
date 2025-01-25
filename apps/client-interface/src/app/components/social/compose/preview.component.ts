// post-preview.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="{ 'background-color': backgroundColor, color: textColor }">
      <div [innerHTML]="content"></div>
      <div *ngFor="let tag of tags">{{ tag }}</div>
      <div *ngFor="let file of files">{{ file.name }}</div>
    </div>
  `,
})
export class PostPreviewComponent {
  @Input() content = '';
  @Input() tags: string[] = [];
  @Input() files: File[] = [];
  @Input() backgroundColor = '#ffffff';
  @Input() textColor = '#000000';
}