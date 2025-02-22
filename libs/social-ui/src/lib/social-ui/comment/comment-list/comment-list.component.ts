import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, AccordionComponent, GridComponent } from '@optomistic-tanuki/common-ui';


export declare type CommentType = {
  username: string;
  id: string;
  text: string;
  responses: Array<CommentType>;
  date: Date;
}

@Component({
  selector: 'lib-comment-list',
  standalone: true,
  imports: [CommonModule, CardComponent, AccordionComponent, GridComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  @Input() comments: Array<CommentType> = [];
  @Output() commentResponded: EventEmitter<{original: CommentType, reply: string}> = new EventEmitter<{original: CommentType, reply: string}>();

  get replySections() {
    return this.comments.map(comment => ({
      heading: comment.username,
      content: comment.text,
      subItems: comment.responses.map(response => ({
        heading: response.username,
        content: response.text,
      }))
    }));
  }

  onCommentReply(originalComment: CommentType, reply: string) {
    this.commentResponded.emit({original: originalComment, reply});
  }
}
