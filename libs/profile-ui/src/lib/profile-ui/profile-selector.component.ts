import { Component, EventEmitter, Input, Output, signal, TemplateRef, ViewChild, OnInit, HostListener, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent, TileComponent } from '@optomistic-tanuki/common-ui';
import { ImageUploadComponent, TextAreaComponent, TextInputComponent } from '@optomistic-tanuki/form-ui';
import { ProfileDto } from '../models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { CreateProfileDto } from '@optomistic-tanuki/libs/models';
import { Themeable, ThemeColors, ThemeService } from '@optomistic-tanuki/theme-ui';

export interface UpdateProfilePayload {
  id: string;
  name: string;
  description: string;
  profilePic?: string; // Can be existing URL or new base64 data
  coverPic?: string;   // Can be existing URL or new base64 data
  bio: string;
}

// Define an approximate width for each tile (including its padding/margin)
const APPROX_TILE_WIDTH_PX = 150; // Updated to match the CSS max-width

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
export class ProfileSelectorComponent extends Themeable implements OnInit, AfterViewInit { // Added OnInit, AfterViewInit
  @Input() profiles: ProfileDto[] = [];
  @Input() currentSelectedProfile: ProfileDto | null = null;
  @Output() selectedProfile: EventEmitter<ProfileDto> = new EventEmitter<ProfileDto>();
  @Output() profileCreated: EventEmitter<CreateProfileDto> = new EventEmitter<CreateProfileDto>();
  @Output() profileUpdated: EventEmitter<UpdateProfilePayload> = new EventEmitter<UpdateProfilePayload>();
  @ViewChild('profileDialog') profileDialog: TemplateRef<any>;
  internalSelectedProfile = signal<ProfileDto | null>(null);
  editingProfile: ProfileDto | null = null;
  dynamicGridColumns = signal(2); // Initialize with minimum columns

  showCreateProfile = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    themeService: ThemeService,
    private elRef: ElementRef, // Inject ElementRef
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    super(themeService);
    this.profileForm = this.fb.group({
      profileName: this.fb.control(''),
      description: this.fb.control(''),
      profilePic: this.fb.control(''),
      coverPic: this.fb.control(''),
      bio: this.fb.control('')
    });
  }
  ngAfterViewInit(): void {
    // Perform initial calculation after the view and its children are initialized.
    this.updateGridColumns();
    // Manually trigger change detection if needed, especially if running in dev mode
    // and to prevent ExpressionChangedAfterItHasBeenCheckedError.
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateGridColumns();
  }

  override ngOnInit(): void {
    super.ngOnInit(); // Call Themeable's ngOnInit
    // Initial grid calculation is now handled by ngAfterViewInit
  }

  private updateGridColumns(): void {
    const hostElement = this.elRef.nativeElement as HTMLElement;
    let availableWidth = hostElement.offsetWidth;

    // Fallback if offsetWidth is 0 (e.g., element not visible yet)
    if (availableWidth === 0 && typeof window !== 'undefined') {
        availableWidth = window.innerWidth; // Or a more specific parent container width
    }
    
    // Subtract any horizontal padding of the container if not accounted for by offsetWidth
    // For example, if the grid container itself has padding.
    // const gridPadding = 0; // Example: 20px left + 20px right = 40
    // availableWidth -= gridPadding;

    if (availableWidth > 0) {
      const calculatedColumns = Math.floor(availableWidth / APPROX_TILE_WIDTH_PX);
      const columnsToSet = Math.max(2, calculatedColumns); // Ensure minimum of 2 columns
      this.dynamicGridColumns.set(columnsToSet);
    } else {
      this.dynamicGridColumns.set(2); // Default to 2 if width calculation is not possible
    }
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

  selectProfile(profileId: string) { // Changed parameter to profileId for clarity
    const selected = this.profiles.find(p => p.id === profileId);
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
    this.editingProfile = null;
    this.profileForm.reset();
    // Set default values for potentially missing fields in CreateProfileDto if needed
    this.profileForm.patchValue({
        profilePic: '', // Ensure these are cleared for new profile
        coverPic: ''
    });
    this.dialog.closeAll();
    this.dialog.open(this.profileDialog);
  }

  editProfile(profile: ProfileDto) {
    this.editingProfile = profile;
    this.profileForm.patchValue({
      profileName: profile.profileName,
      bio: profile.bio,
      // Assuming ProfileDto might not have description or coverPic.
      // If it does, pre-fill them: profile.description || '', profile.coverPicUrl || ''
      description: (profile as any).description || '', // Or load from a more complete DTO
      profilePic: profile.profilePic, // This is the URL to the existing picture
      coverPic: (profile as any).coverPicUrl || '',   // This is the URL to the existing cover picture
    });
    this.dialog.open(this.profileDialog);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      if (this.editingProfile) {
        const payload: UpdateProfilePayload = {
          id: this.editingProfile.id,
          name: this.profileForm.value.profileName,
          description: this.profileForm.value.description,
          profilePic: this.profileForm.value.profilePic, // Will be existing URL or new base64
          coverPic: this.profileForm.value.coverPic,   // Will be existing URL or new base64
          bio: this.profileForm.value.bio,
        };
        this.profileUpdated.emit(payload);
      } else {
        const newProfile: CreateProfileDto = {
          name: this.profileForm.value.profileName,
          description: this.profileForm.value.description,
          userId: 'currentUserId', // Replace with actual user ID
          profilePic: this.profileForm.value.profilePic || 'https://placehold.co/100x100/grey/white?text=No+Pic',
          coverPic: this.profileForm.value.coverPic || 'https://placehold.co/600x200/grey/white?text=No+Cover',
          bio: this.profileForm.value.bio || '',
          location: '',
          occupation: '',
          interests: '',
          skills: '',
        };
        this.profileCreated.emit(newProfile);
      }
      this.profileForm.reset();
      this.dialog.closeAll();
      this.editingProfile = null;
    }
  }

  onCancel() {
    this.profileForm.reset();
    this.dialog.closeAll();
    this.editingProfile = null;
  }
}
