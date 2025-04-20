// filepath: libs/common-ui/src/lib/common-ui/themeable.ts
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { ThemeColors } from './theme.interface';
import { Subject, takeUntil, filter } from 'rxjs';

@Directive()
export abstract class Themeable implements OnInit, OnDestroy {
  background: string;
  foreground: string;
  accent: string;
  complement: string;
  borderColor: string;
  borderGradient: string;
  transitionDuration = '0.3s';
  protected destroy$ = new Subject<void>();

  constructor(protected readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.themeColors$
      .pipe(
        filter(
          (value) =>
            !!(value && value.background && value.foreground && value.accent),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (colors: ThemeColors | undefined) => {
          if (colors) {
            this.applyTheme(colors);
          }
        },
        error: (err: any) => {
          console.error('Error fetching theme colors:', err);
        },
        complete: () => {
          console.log('Theme colors subscription completed');
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  abstract applyTheme(colors: ThemeColors): void;
}