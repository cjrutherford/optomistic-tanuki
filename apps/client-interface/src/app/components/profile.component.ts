import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { PostComponent } from './profile/posts/posts.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatListModule, 
    MatIconModule, 
    GalleryComponent,
    FriendsComponent,
    PostComponent,
  ],
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
recentPosts: { 
  title: string; 
  content: string; 
  attachment: string; 
  comments: { user: string; comment: string }[]; 
  votes: { upvotes: number; downvotes: number } 
}[] = [
  { 
    title: 'Post 1', 
    content: 'Content of post 1', 
    attachment: 'https://placehold.it/600x400', 
    comments: [
      { user: 'User1', comment: 'Great post!' }, 
      { user: 'User2', comment: 'Thanks for sharing!' }
    ], 
    votes: { upvotes: 10, downvotes: 2 } 
  },
  { 
    title: 'Post 2', 
    content: 'Content of post 2', 
    attachment: 'https://placehold.it/600x400', 
    comments: [
      { user: 'User3', comment: 'Interesting read.' }, 
      { user: 'User4', comment: 'I learned a lot.' }
    ], 
    votes: { upvotes: 8, downvotes: 1 } 
  },
  { 
    title: 'Post 3', 
    content: 'Content of post 3', 
    attachment: 'https://placehold.it/600x400', 
    comments: [
      { user: 'User5', comment: 'Very informative.' }, 
      { user: 'User6', comment: 'Well written!' }
    ], 
    votes: { upvotes: 15, downvotes: 3 } 
  }
];
}
