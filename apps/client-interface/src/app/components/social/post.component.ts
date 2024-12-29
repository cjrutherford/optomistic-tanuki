import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VoteComponent } from './vote.component';
import { CommentComponent } from './comment.component';
import { ThemeService } from '../../theme/theme.service';

export declare type PostType = {
  id: string;
  title: string;
  content: string;
  attachment: string;
  comments: { user: string; comment: string }[];
  createdAt: Date;
  updatedAt: Date;
  votes: { upvotes: number; downvotes: number };
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, VoteComponent, CommentComponent],
  providers: [ThemeService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit{
  theme: 'light' | 'dark' = 'light';
  constructor(private themeService: ThemeService) {} 
  ngOnInit() {
    this.themeService.theme$.subscribe(theme => this.theme = theme);
  }
  @Input() content: PostType;
  @Input() attachments: any[] = [];
  @Input() links: any[] = [];
}
