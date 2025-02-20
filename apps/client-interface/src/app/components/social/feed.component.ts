import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ComposeComponent } from './compose.component';
import { PostComponent, PostType } from './post.component';
import { ThemeService } from '../../theme/theme.service';
import { PatternComponent } from '../Svg/pattern.component';
import { CardComponent } from '@optomistic-tanuki/common-ui';
import { PostService, PostDto } from '../../post.service';

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
  providers: [ThemeService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  themeStyles: {
    backgroundColor: string;
    color: string;
    border: string;
  };

  constructor(private readonly themeService: ThemeService, private readonly postService: PostService) {
    this.themeService.themeColors$.subscribe((colors) => {
      this.themeStyles = {
        backgroundColor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.accent}`,
      };
    });
  }

  ngOnInit() {
    this.postService.searchPosts({}).subscribe(posts => this.posts = posts.map((post) => this.mapPostDtoToType(post)));
  }
  posts: PostType[] = []

  mapPostDtoToType(post: PostDto): PostType {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      attachment: '',
      comments: [],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      votes: { upvotes: 0, downvotes: 0 },
    };
  }
  createdPost(post: PostDto) {
    this.posts.unshift(this.mapPostDtoToType(post));
  }
  
  onScroll() {
    // const length = this.posts.length;
    // this.posts.push(...Array.from({ length: 20 }, (_, i) => `Post #${length + i + 1}`));
  }
}
