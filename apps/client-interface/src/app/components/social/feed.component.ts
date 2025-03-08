import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  CommentDto,
  PostDto,
  ComposeComponent,
  PostComponent,
  CreatePostDto,
  CreateCommentDto,
} from '@optomistic-tanuki/social-ui';
import { ThemeService } from '../../theme/theme.service';
import { PatternComponent } from '../Svg/pattern.component';
import { CardComponent } from '@optomistic-tanuki/common-ui';
import { PostService } from '../../post.service';
import { ComposeCompleteEvent } from 'libs/social-ui/src/lib/social-ui/compose/compose.component';
import { AttachmentService } from '../../attachment.service';
import { firstValueFrom } from 'rxjs';
import { CommentService } from '../../comment.service';
import { ProfileService } from '../../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ComposeComponent,
    PostComponent,
    PatternComponent,
    CardComponent,
  ],
  providers: [ThemeService, PostService, AttachmentService, CommentService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  themeStyles: {
    backgroundColor: string;
    color: string;
    border: string;
  };

  constructor(
    private readonly themeService: ThemeService,
    private readonly postService: PostService,
    private readonly attachmentService: AttachmentService,
    private readonly commentService: CommentService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
  ) {
    this.themeService.themeColors$.subscribe((colors) => {
      this.themeStyles = {
        backgroundColor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.accent}`,
      };
    });
  }

  ngOnInit() {
    if(this.profileService.currentUserProfile()){
      this.postService.searchPosts({}).subscribe((posts) => (this.posts = posts));
    } else {
      this.router.navigate(['/profile'])
    }
  }
  posts: PostDto[] = [];

  createdPost(postData: ComposeCompleteEvent) {
    const { post, attachments, links } = postData;
    this.postService
      .createPost(post as CreatePostDto)
      .subscribe(async (newPost) => {
        if (attachments.length > 0) {
          for (const atta of attachments) {
            const newAttachment = await firstValueFrom(
              this.attachmentService.createAttachment(atta),
            );
            if (!newPost.attachments) {
              newPost.attachments = [];
            }
            newPost.attachments.push(newAttachment);
          }
        }
        this.posts.unshift(newPost);
      });
  }

  commented(newComment: CreateCommentDto) {
    console.log('🚀 ~ FeedComponent ~ commented ~ newComment:', newComment);
    this.commentService.createComment(newComment).subscribe({
      next: (comment) => {
        const post = this.posts.find((p) => p.id === newComment.postId);
        if (post) {
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(comment);
        }
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      },
    });
  }

  onScroll() {
    // const length = this.posts.length;
    // this.posts.push(...Array.from({ length: 20 }, (_, i) => `Post #${length + i + 1}`));
  }
}
