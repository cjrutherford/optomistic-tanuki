import { Component, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';
import { QuillModule, QuillModules } from 'ngx-quill';

@Component({
  selector: 'lib-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, QuillModule],
  providers: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Output() commentAdded: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('commentDialog') commentDialog: TemplateRef<HTMLElement>;
  comment = '';

  constructor(private dialog: MatDialog) {
  }

  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  openCommentDialog() {
    this.dialog.closeAll();
    this.dialog.open(this.commentDialog);
  }

  onSubmit() {
    this.commentAdded.emit(this.comment);
    this.comment = ''
    this.dialog.closeAll();
  }

  onCancel() {
    this.comment = '';
    this.dialog.closeAll();
  }
}
