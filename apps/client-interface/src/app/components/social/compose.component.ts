// compose.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackgroundPickerComponent } from './compose/bg-picker.component';
import { TaggingComponent } from './compose/tagging.component';
import { RichTextEditorComponent } from './compose/rich-text.component';
import { PostPreviewComponent } from './compose/preview.component';
import { AttachmentComponent } from './attachment.component';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [
    RichTextEditorComponent,
    AttachmentComponent,
    TaggingComponent,
    BackgroundPickerComponent,
    PostPreviewComponent,
  ],
  template: `
    <app-rich-text-editor (contentChange)="content = $event"></app-rich-text-editor>
    <app-attachment-upload (filesChange)="files = $event"></app-attachment-upload>
    <app-tagging (tagsChange)="tags = $event"></app-tagging>
    <app-background-picker
      (backgroundChange)="backgroundColor = $event"
      (textColorChange)="textColor = $event"
    ></app-background-picker>
    <app-post-preview
      [content]="content"
      [tags]="tags"
      [files]="files"
      [backgroundColor]="backgroundColor"
      [textColor]="textColor"
    ></app-post-preview>
    <button (click)="onSubmit()"> Go! </button>
  `,
})
export class ComposeComponent {
  content = '';
  files: File[] = [];
  tags: string[] = [];
  backgroundColor = '#ffffff';
  textColor = '#000000';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('content', this.content);
    formData.append('backgroundColor', this.backgroundColor);
    formData.append('textColor', this.textColor);
    this.tags.forEach((tag) => formData.append('tags', tag));
    this.files.forEach((file) => formData.append('files', file));

    this.http.post('/api/posts', formData).subscribe((response) => {
      console.log('Post saved:', response);
    });
  }
}