import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  CardComponent,
  GridComponent,
  TileComponent,
} from '@optomistic-tanuki/common-ui';
import { VoteComponent } from '../vote/vote.component';
import { CommentComponent } from '../comment/comment.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';

export declare type PostType = {
  id: string;
  title: string;
  content: string;
  attachment: string;
  comments: { user: string; comment: string }[];
  createdAt: Date;
  updatedAt: Date;
  votes: { upvotes: number; downvotes: number };
};

@Component({
  selector: 'lib-post',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    VoteComponent,
    CommentComponent,
    GridComponent,
    TileComponent,
    CommentListComponent,
  ],
  providers: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';
  constructor() {}
  ngOnInit() {}
  @Input() content: PostType;
  @Input() attachments: any[] = [];
  @Input() links: any[] = [];

  downloadAttachment(attachment: any) {
    // Logic to download the attachment
    console.log('Downloading attachment:', attachment);
  }
  openLink(link: any) {
    // Logic to open the link
    console.log('Opening link:', link);
  }

  get attachmentRows() {
    return Math.ceil(this.attachments.length / 6);
  }
}
