import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profilePicture = 'https://placehold.it/600x600';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  bannerPhoto: string = 'https://placehold.it/1200x300';
  photoGalleries: string[] = ['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg'];
  friends: string[] = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5', 'Friend 6'];
  recentPosts: string[] = ['Post 1', 'Post 2', 'Post 3'];
}
