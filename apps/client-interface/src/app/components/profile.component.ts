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
  photoGalleries: {coverPhoto: string, title: string}[] = [{
    coverPhoto: 'https://placehold.it/300x300', 
    title: "Gallery1"
  },{ 
    coverPhoto: 'https://placehold.it/300x300',
    title: 'Gallery2',
  },{
    coverPhoto: 'https://placehold.it/300x300',
    title: 'Gallery3', 
  }];
  friends: {photo: string, name: string}[] = [
    { name: 'Friend 1', photo: 'https://placehold.it/300x300' }, 
    { name: 'Friend 2', photo: 'https://placehold.it/300x300' }, 
    { name: 'Friend 3', photo: 'https://placehold.it/300x300' }, 
    { name: 'Friend 4', photo: 'https://placehold.it/300x300' }, 
    { name: 'Friend 5', photo: 'https://placehold.it/300x300' }, 
    { name: 'Friend 6', photo: 'https://placehold.it/300x300' }
  ];
  recentPosts: string[] = ['Post 1', 'Post 2', 'Post 3'];
}
