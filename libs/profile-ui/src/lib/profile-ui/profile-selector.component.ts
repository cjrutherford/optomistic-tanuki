import { Component, EventEmitter, Input, Output, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent, TileComponent } from '@optomistic-tanuki/common-ui';
import { ImageUploadComponent, TextAreaComponent, TextInputComponent } from '@optomistic-tanuki/form-ui';
import { ProfileDto } from '../models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';

@Component({
  selector: 'lib-profile-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    TileComponent,
    GridComponent,
    TextInputComponent,
    TextAreaComponent,
    ButtonComponent,
    MatDialogModule,
    ProfilePhotoComponent,
    ImageUploadComponent,
  ],
  templateUrl: './profile-selector.component.html',
  styleUrl: './profile-selector.component.scss',
})
export class ProfileUiComponent {
  @Input() profiles: ProfileDto[] = [];
  @Output() selectedProfile: EventEmitter<ProfileDto> = new EventEmitter<ProfileDto>();
  @ViewChild('profileDialog') profileDialog: TemplateRef<any>;
  internalSelectedProfile = signal<ProfileDto | null>(null);

  showCreateProfile = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      profileName: this.fb.control(''),
      description: this.fb.control(''),
      profilePic: this.fb.control(''),
      bio: this.fb.control('')
    });
  }

  selectProfile(profile: string) {
    const selected = this.profiles.find(p => p.id === profile);
    if (selected) {
      this.internalSelectedProfile.set(selected);
      this.selectedProfile.emit(selected);
    }
  }

  imageUploaded(file: string) {
    this.profileForm.patchValue({ profilePic: file });
  }

  addNewProfile() {
    this.dialog.closeAll()
    this.dialog.open(this.profileDialog);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const newProfile: ProfileDto = this.profileForm.value;
      this.profiles.push(newProfile);
      this.profileForm.reset();
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.profileForm.reset();
    this.dialog.closeAll();
  }
}
