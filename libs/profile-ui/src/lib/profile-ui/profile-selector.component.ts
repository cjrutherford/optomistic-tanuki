import { Component, EventEmitter, Input, Output, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent, TileComponent } from '@optomistic-tanuki/common-ui';
import { ImageUploadComponent, TextAreaComponent, TextInputComponent } from '@optomistic-tanuki/form-ui';
import { ProfileDto } from '../models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { CreateProfileDto } from '@optomistic-tanuki/libs/models';

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
export class ProfileSelectorComponent {
  @Input() profiles: ProfileDto[] = [];
  @Input() currentSelectedProfile: ProfileDto | null = null;
  @Output() selectedProfile: EventEmitter<ProfileDto> = new EventEmitter<ProfileDto>();
  @Output() profileCreated: EventEmitter<CreateProfileDto> = new EventEmitter<CreateProfileDto>();
  @ViewChild('profileDialog') profileDialog: TemplateRef<any>;
  internalSelectedProfile = signal<ProfileDto | null>(null);

  showCreateProfile = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      profileName: this.fb.control(''),
      description: this.fb.control(''),
      profilePic: this.fb.control(''),
      coverPic: this.fb.control(''),
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

  coverUploaded(file: string) {
    this.profileForm.patchValue({ coverPic: file });
  }

  addNewProfile() {
    this.dialog.closeAll()
    this.dialog.open(this.profileDialog);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const newProfile: CreateProfileDto = {
        name: this.profileForm.value.profileName,
        description: this.profileForm.value.description,
        userId: 'currentUserId', // Replace with actual user ID
        profilePic: this.profileForm.value.profilePic || 'defaultProfilePic.png',
        coverPic: this.profileForm.value.coverPic || 'defaultCoverPic.png',
        bio: this.profileForm.value.bio || '',
        location: '',
        occupation: '',
        interests: '',
        skills: '',
      };
      this.profileCreated.emit(newProfile);
      this.profileForm.reset();
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.profileForm.reset();
    this.dialog.closeAll();
  }
}
