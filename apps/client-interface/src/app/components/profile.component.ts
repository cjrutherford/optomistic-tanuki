import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { PostComponent, PostType } from './social/post.component';
import { CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';

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
    GridComponent
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
recentPosts: PostType[] = [
  { 
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    id: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
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
