import { Component, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';
import { TextInputComponent } from '@optomistic-tanuki/form-ui';

@Component({
  selector: 'lib-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CardComponent, TextInputComponent, ButtonComponent],
  providers: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Output() commentAdded: EventEmitter<string> = new EventEmitter<string>();
  commentForm: FormGroup;
  @ViewChild('commentDialog') commentDialog: TemplateRef<any>;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

  openCommentDialog() {
    this.dialog.closeAll();
    this.dialog.open(this.commentDialog);
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.commentAdded.emit(this.commentForm.value.comment);
      this.commentForm.reset();
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.dialog.closeAll();
  }
}
