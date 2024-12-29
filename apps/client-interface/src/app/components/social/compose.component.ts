import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from './attachment.component';
import { LinkComponent } from './link.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../theme/theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CommonModule, AttachmentComponent, LinkComponent, MatButtonModule],
  providers: [ThemeService],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss',
})
export class ComposeComponent implements OnDestroy {
    themeSub: Subscription;
  themeStyles: {
    'background-color': string;
    color: string;
    border: string;
  };

  constructor(private themeService: ThemeService) {
    this.themeSub = this.themeService.themeColors$.subscribe((theme) => {
      this.themeStyles = {
        'background-color': theme.background,
        color: theme.foreground,
        border: `1px solid ${theme.accent}`,
      };
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
