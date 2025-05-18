import { Component, EventEmitter, Input, Output, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent, TileComponent } from '@optomistic-tanuki/common-ui';
import { ImageUploadComponent, TextAreaComponent, TextInputComponent } from '@optomistic-tanuki/form-ui';
import { ProfileDto } from '../models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { CreateProfileDto } from '@optomistic-tanuki/libs/models';
import { Themeable, ThemeColors, ThemeService } from '@optomistic-tanuki/theme-ui';

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
    ButtonComponent,
    MatDialogModule,
    ProfilePhotoComponent,
    ImageUploadComponent,
  ],
  templateUrl: './profile-selector.component.html',
  styleUrl: './profile-selector.component.scss',
  host: {
    'class.theme': 'theme',
    '[style.--background]': 'background',
    '[style.--foreground]': 'foreground',
    '[style.--accent]': 'accent',
    '[style.--complement]': 'complement',
    '[style.--border-color]': 'borderColor',
    '[style.--border-gradient]': 'borderGradient',
    '[style.--transition-duration]': 'transitionDuration',
  }
})
export class ProfileSelectorComponent extends Themeable{
  @Input() profiles: ProfileDto[] = [];
  @Input() currentSelectedProfile: ProfileDto | null = null;
  @Output() selectedProfile: EventEmitter<ProfileDto> = new EventEmitter<ProfileDto>();
  @Output() profileCreated: EventEmitter<CreateProfileDto> = new EventEmitter<CreateProfileDto>();
  @ViewChild('profileDialog') profileDialog: TemplateRef<any>;
  internalSelectedProfile = signal<ProfileDto | null>(null);

  showCreateProfile = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, themeService: ThemeService) {
    super(themeService);
    this.profileForm = this.fb.group({
      profileName: this.fb.control(''),
      description: this.fb.control(''),
      profilePic: this.fb.control(''),
      coverPic: this.fb.control(''),
      bio: this.fb.control('')
    });
  }
  override applyTheme(colors: ThemeColors): void {
    this.background = `linear-gradient(to bottom, ${colors.background}, ${colors.accent})`;
    this.accent = colors.accent;
    this.foreground = colors.foreground;
    this.complement = colors.complementary;
    if(this.theme === 'dark') {
      this.borderGradient = colors.accentGradients['dark'];
      this.borderColor = colors.complementaryShades[2][0];
    } else {
      this.borderGradient = colors.accentGradients['light'];
      this.borderColor = colors.complementaryShades[2][1];
    }
    this.transitionDuration = '0.3s';
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

  editProfile(profile: ProfileDto) {
    // Open the profile dialog pre-filled for editing (implementation can be expanded)
    this.profileForm.patchValue({
      profileName: profile.profileName,
      bio: profile.bio,
      profilePic: profile.profilePic,
      coverPic: profile.coverPic,
      description: profile.description || ''
    });
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
