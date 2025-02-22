import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from '../attachment/attachment.component';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';
import {
  TextAreaComponent,
  TextInputComponent,
} from '@optomistic-tanuki/form-ui';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LinkComponent } from '../link/link.component';
import { GridComponent } from "../../../../../common-ui/src/lib/common-ui/grid/grid.component";

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
}
