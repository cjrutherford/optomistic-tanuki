import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pattern',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pattern.component.html',
  styleUrl: './pattern.component.scss',
})
export class PatternComponent implements OnInit, OnDestroy {
  constructor(private readonly theme: ThemeService) {}
  sub: Subscription;
  fill1: string;
  fill2: string;
  fill3: string;
  fill4: string;

  ngOnInit(){
    this.sub = this.theme.themeColors$.subscribe(s => {
      const {
        accentShades
      } = s;
      const shuffled = accentShades.sort(() => 0.5 - Math.random());
      [[, this.fill1], [, this.fill2], [, this.fill3], [, this.fill4]] = shuffled.slice(0, 4);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
