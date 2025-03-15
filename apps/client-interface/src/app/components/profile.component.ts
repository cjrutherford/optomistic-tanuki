import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { PostComponent, PostType } from './social/post.component';
import { CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';
import { BannerComponent } from '@optomistic-tanuki/profile-ui';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent,
    MatCardModule, 
    MatListModule, 
    MatIconModule, 
    GalleryComponent,
    FriendsComponent,
    PostComponent,
    GridComponent,
    BannerComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  constructor(private readonly profileService: ProfileService) {
    const profile = localStorage.getItem('selectedProfile');
    if (profile) {
      this.profileService.selectProfile(JSON.parse(profile));
    }
  }
  get profile() {
    return this.profileService.getCurrentUserProfile();
  }
}
