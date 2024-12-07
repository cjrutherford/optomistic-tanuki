import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

@Component({
    standalone: true,
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss'],
    imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
})
export class FriendsComponent {
    @Input() friend: {photo: string, name: string} = {
        photo: 'https://placehold.it/300x300',
        name: 'Friend',
    }
}