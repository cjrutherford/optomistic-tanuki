import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from '../attachment/attachment.component';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';
import {
  TextAreaComponent,
  TextInputComponent,
} from '@optomistic-tanuki/form-ui';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LinkComponent } from '../link/link.component';
import { GridComponent } from "@optomistic-tanuki/common-ui";
import { CreatePostDto, UpdatePostDto, CreateAttachmentDto,  } from '../../models';

export declare type ComposeCompleteEvent = {
  post: CreatePostDto | UpdatePostDto;
  attachments: CreateAttachmentDto[];
  links: { url: string }[];
};

@Component({
  selector: 'lib-compose',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TextAreaComponent,
    ButtonComponent,
    TextInputComponent,
    AttachmentComponent,
    ReactiveFormsModule,
    LinkComponent,
    GridComponent
],
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent {
  composeForm: FormGroup;
  @Output() postSubmitted: EventEmitter<ComposeCompleteEvent> = new EventEmitter<ComposeCompleteEvent>();

  constructor(private readonly formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      title: this.formBuilder.control(''),
      content: this.formBuilder.control(''),
      attachments: this.formBuilder.array<File>([]),
      links: this.formBuilder.array<{ url: string }>([]),
    });
  }

  get links() {
    return this.composeForm.get('links')?.value;
  }

  onSubmit(): void {
    if (this.composeForm.valid) {
      console.log('Form Submitted', this.composeForm.value);
      this.composeForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  onAttachmentChange(event: { all: File[]; added: File[]; removed: File[] }): void {
    console.log('Attachment changes:', event);
    this.composeForm.patchValue({ attachments: event.all });
  }

  onLinksChange(event: { all: { url: string }[], added?: { url: string }, removed?: { url: string } }): void {
    console.log('Link changes:', event);
    this.composeForm.patchValue({ links: event.all });
  }

  onPostSubmit(): void {
    if (this.composeForm.valid) {
      const postData: CreatePostDto = {
        title: this.composeForm.value.title,
        content: this.composeForm.value.content,
      };
      const attachments: CreateAttachmentDto[] = this.composeForm.value.attachments.map((file: File) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        postId: 'post-id-placeholder', // Replace with actual post ID
      }));
      const links = this.composeForm.value.links.map((link: { url: string }) => ({ url: link.url }));
      this.postSubmitted.emit({ post: postData, attachments, links });
      console.log('Post submitted:', postData);
      console.log('Attachments:', attachments); 
      console.log('Links:', links);
      this.composeForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
