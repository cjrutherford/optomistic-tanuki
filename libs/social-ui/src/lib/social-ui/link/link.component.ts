import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, GridComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'lib-link',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, GridComponent, ButtonComponent],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() links: { url: string }[] = [];
  @Output() linksChange = new EventEmitter<{ all: { url: string }[], added?: { url: string }, removed?: { url: string } }>();
  linkValue: string = '';

  addLink() {
    if (this.linkValue.trim() === '') {
      return;
    }
    const newLink = { url: this.linkValue };
    this.links.push(newLink);
    this.linksChange.emit({ all: this.links, added: newLink });
    this.linkValue = '';
  }

  removeLink(link: { url: string }) {
    this.links = this.links.filter(l => l !== link);
    this.linksChange.emit({ all: this.links, removed: link });
  }
}
