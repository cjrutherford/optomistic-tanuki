import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';
import { CommentDto } from '../../../models';

@Component({
  selector: 'lib-comment-list',
  standalone: true,
  imports: [CommonModule, CardComponent, GridComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  @Input() comments: Array<CommentDto> = [];
}
