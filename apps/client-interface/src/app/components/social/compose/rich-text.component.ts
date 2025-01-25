// rich-text-editor.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [EditorComponent, FormsModule],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  template: `
    <editor
      apiKey="your-tinymce-api-key"
      [(ngModel)]="content"
      (ngModelChange)="onContentChange($event)"
      [init]="editorConfig"
    ></editor>
  `,
})
export class RichTextEditorComponent {
  @Output() contentChange = new EventEmitter<string>();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  content: string = '';

  editorConfig = {
    plugins: 'link image lists code upload media accordion anchor autosave autolink advlist charmap emoticons fullscreen hr insertdatetime noneditable pagebreak preview print save searchreplace table template textcolor visualchars wordcount',
    toolbar: 'bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | forecolor backcolor | removeformat | code | fullscreen | upload | media | template | pagebreak',
  };

  onContentChange(content: string) {
    this.contentChange.emit(content);
  }
}