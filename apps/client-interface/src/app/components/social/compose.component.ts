import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from './attachment.component';
import { LinkComponent } from './link.component';
import { firstValueFrom, Subscription } from 'rxjs';
import { ThemeService } from '../../theme/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreatePostDto, PostDto, PostService } from '../../post.service';
import { AttachmentDto, AttachmentService } from '../../attachment.service';
import { AuthStateService } from '../../state/auth-state.service';
import { TextAreaComponent } from '@optomistic-tanuki/form-ui';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CommonModule, AttachmentComponent, LinkComponent, MatButtonModule, ReactiveFormsModule, ButtonComponent, CardComponent, TextAreaComponent],
  providers: [ThemeService, PostService, AttachmentService, AuthStateService],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss',
})
export class ComposeComponent implements OnInit, OnDestroy {
  @Input() post?: PostDto;
  @Input() attachments: AttachmentDto[] = [];
  @Output() postCreated = new EventEmitter<PostDto>();
  @Output() postUpdated = new EventEmitter<PostDto>();
  
  themeSub: Subscription;
  themeStyles: {
    'background-color': string;
    color: string;
    border: string;
  };
  
  composeForm: FormGroup;

  @ViewChild(AttachmentComponent) attachmentComponent!: AttachmentComponent;

  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private postService: PostService,
    private attachmentService: AttachmentService,
    private readonly authStateService: AuthStateService
  ) {
    this.themeSub = this.themeService.themeColors$.subscribe((theme) => {
      this.themeStyles = {
        'background-color': theme.background,
        color: theme.foreground,
        border: `1px solid ${theme.accent}`,
      };
    });
  }

  ngOnInit() {
    this.composeForm = this.fb.group({
      title: this.fb.control(this.post?.title || ''),
      content: this.fb.control(this.post?.content || ''),
      attachments: this.fb.array(this.attachments.map(attachment => attachment.name))
    });
  }

  submit() {
    const formValue = this.composeForm.value;
    const postDto: CreatePostDto = {
      title: formValue.title,
      content: formValue.content,
    };

    if (this.post) {
      firstValueFrom(this.postService.updatePost(this.post.id, postDto))
        .then((post) => {
          this.postCreated.emit(post);
        });
    } else {
      firstValueFrom(this.postService.createPost(postDto))
        .then((post) => {
          this.postCreated.emit(post);
        });
    }


    
  }

  attachmentChanged(attachments: Partial<AttachmentDto>[]) {
    this.composeForm.patchValue({
      attachments: attachments,
    })
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
