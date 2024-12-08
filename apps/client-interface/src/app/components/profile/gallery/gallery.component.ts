import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
    standalone: true,
    imports: [CommonModule, MatCardModule],
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
    @Input() data: {coverPhoto: string, title: string} = {
        coverPhoto: 'https://placehold.it/300x300',
        title: 'Gallery'
    };
}