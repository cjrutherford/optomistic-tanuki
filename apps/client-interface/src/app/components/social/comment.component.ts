import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../theme/theme.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule],
  providers: [ThemeService],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  commentForm: FormGroup;
  @ViewChild('commentDialog') commentDialog: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

  openCommentDialog() {
    this.dialog.open(this.commentDialog);
  }

  onSubmit() {
    if (this.commentForm.valid) {
      // Handle form submission
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.dialog.closeAll();
  }
}
