import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ComposeComponent } from './compose.component';
import { PostComponent, PostType } from './post.component';
import { ThemeService } from '../../theme/theme.service';
import { PostDto } from '@optomistic-tanuki/libs/models';
import { PatternComponent } from '../Svg/pattern.component';

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
    PatternComponent
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

  constructor(private readonly themeService: ThemeService) {
    this.themeService.themeColors$.subscribe((colors) => {
      this.themeStyles = {
        backgroundColor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.accent}`,
      };
    });
  }
  posts = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Post #${i + 1}`,
    content: `This is the content of post #${i + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PostType));
  
  onScroll() {
    // const length = this.posts.length;
    // this.posts.push(...Array.from({ length: 20 }, (_, i) => `Post #${length + i + 1}`));
  }
}
