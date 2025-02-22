import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ButtonComponent,
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent {
  linkForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private readonly fb: FormBuilder,
  ) {
    this.linkForm = this.fb.group({
      url: this.fb.control(''),
      description: this.fb.control(''),
    });
  }

  @ViewChild('linkDialog') linkDialog: TemplateRef<any>;

  openLinkDialog() {
    this.dialog.open(this.linkDialog);
  }

  addLink(event: Event) {
    event.preventDefault();
    // Logic to add the link
    this.dialog.closeAll();
  }

  cancel() {
    this.dialog.closeAll();
  }
}
