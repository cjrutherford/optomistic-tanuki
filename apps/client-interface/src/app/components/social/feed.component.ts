import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ComposeComponent } from './compose.component';
import { PostComponent } from './post.component';
import { ThemeService } from '../../theme/theme.service';

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
    PostComponent
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
  posts = Array.from({ length: 20 }, (_, i) => `Post #${i + 1}`);
  
  onScroll() {
    const length = this.posts.length;
    this.posts.push(...Array.from({ length: 20 }, (_, i) => `Post #${length + i + 1}`));
  }
}
