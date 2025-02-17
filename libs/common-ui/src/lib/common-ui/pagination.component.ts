import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'otui-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Input() maxVisiblePages: number = 5;

  readonly pages = signal<number[]>([]);
  readonly showStartEllipsis = signal<boolean>(false);
  readonly showEndEllipsis = signal<boolean>(false);
  readonly firstPage = signal<number>(1);
  readonly lastPage = signal<number>(this.pages.length);

  ngOnInit(): void {
    this.updatePageList();  
  }

  updatePageList(): void {

    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, this.currentPage + half);

    if (this.currentPage <= half) {
      end = Math.min(this.totalPages, this.maxVisiblePages);
    } else if (this.currentPage + half >= this.totalPages) {
      start = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
    }

    this.showStartEllipsis.set(start > 1);
    this.showEndEllipsis.set(end < this.totalPages);

    const finalPages: number[] = [];
    let actualStart = start;

    if(this.showStartEllipsis()) {
      actualStart++;
    }
    if(!this.showEndEllipsis()) {
      actualStart--;
    }

    for (let i = actualStart; i <= end; i++) {
      finalPages.push(i);
    }

    this.pages.set(finalPages);
  }

  onPageClick(page: number): void {
    this.currentPage = page;
    this.updatePageList();
  }

  onFirstPageClick(): void {
    this.currentPage = 1;
    this.updatePageList();
  }

  onLastPageClick(): void {
    this.currentPage = this.totalPages;
    this.updatePageList();
  }

  onNextPageClick(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageList();
    }
  }

  onPreviousPageClick(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageList();
    }
  }
}
