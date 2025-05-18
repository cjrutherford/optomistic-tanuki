import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector: 'lib-image-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-container" [class.dragover]="isDragOver">
      <input type="file" accept="image/*" (change)="handleImageChange($event)" />
      <div class="drop-target" (drop)="handleDrop($event)" (dragover)="handleDragOver($event)" (dragleave)="handleDragLeave($event)">
        <p>Drag and drop an image here, or click to select one</p>
      </div>
      <img *ngIf="image" [src]="image" alt="Image preview" class="image-preview" />
    </div>
  `,
  styles: [`
    .upload-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      border: 2px dashed #ccc;
      padding: 10px;
      position: relative;
      margin-bottom: 10px;
      input {
        margin: 0 !important;
      }
    }
    .upload-container.dragover {
      border-color: #000;
    }
    .drop-target {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
    }
    .image-preview {
      max-width: 150px;
     margin-top: 1rem;
    }
  `]
})
export class ImageUploadComponent {
  @Output() imageUpload = new EventEmitter<string>();
  image: string | null = null;
  isDragOver = false;

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  @HostListener('dragover', ['$event'])
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.image = reader.result as string;
      this.imageUpload.emit(this.image);
    };
    reader.readAsDataURL(file);
  }
}
