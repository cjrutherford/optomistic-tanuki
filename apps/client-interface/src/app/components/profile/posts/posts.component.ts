import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
    standalone: true,
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    imports: [CommonModule, MatCardModule, MatIconModule]
})
export class PostComponent {
    @Input() data: {
        title: string;
        content: string;
        attachment: string;
        comments: { user: string; comment: string }[];
        votes: { upvotes: number; downvotes: number };
    } = {
        title: 'Post',
        content: 'Content of post',
        attachment: 'https://placehold.it/600x400',
        comments: [],
        votes: { upvotes: 0, downvotes: 0 }
    }
}