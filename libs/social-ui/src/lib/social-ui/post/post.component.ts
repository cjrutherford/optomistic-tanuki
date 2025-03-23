import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import {
  CommentDto,
  AttachmentDto,
  PostDto,
  CreateCommentDto,
} from '../../models';
import { ProfilePhotoComponent } from '@optomistic-tanuki/profile-ui';
import Quill from 'quill';

export declare type PostProfileStub = {
  id: string;
  name: string;
  avatar: string;
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
    ProfilePhotoComponent,
  ],
  providers: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() profile: PostProfileStub | null = {
    id: '',
    name: 'unknown',
    avatar: 'https://placehold.co/300x300',
  };
  theme: 'light' | 'dark' = 'light';
  constructor() {}
  ngOnInit() {}
  @Input() content: PostDto;
  @Input() comments: CommentDto[] = [];
  @Input() attachments: AttachmentDto[] = [];
  @Input() links: any[] = [];
  @Output() newCommentAdded: EventEmitter<CreateCommentDto> =
    new EventEmitter<CreateCommentDto>();

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

  onCommentReply($event: any) {
    console.log('🚀 ~ PostComponent ~ onCommentReply ~ $event:', $event);
    const comment: CreateCommentDto = {
      content: $event.content,
      postId: this.content.id,
      profileId: '',
      parentId: $event.parentId,
    };
    this.newCommentAdded.emit(comment);
  }
  onCommentAdd($event: string) {
    console.log('🚀 ~ PostComponent ~ onCommentAdd ~ $event:', $event);
    const comment: CreateCommentDto = {
      content: $event,
      postId: this.content.id,
      profileId: '',
    };
    this.newCommentAdded.emit(comment);
  }
}
