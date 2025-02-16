import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component'; // Add this import

export interface TableRowAction {
  title: string;
  action: (index: number) => void | Promise<void>;
}

export interface TableCell {
  heading?: string;
  value?: string | TemplateRef<any>;
  isBadge?: boolean;
  customStyles?: { [key: string]: string };
  isSpacer?: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent], // Add ButtonComponent to imports
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() cells: TableCell[] = [];
  @Input() rowIndex: number = 0;
  @Input() rowActions?: TableRowAction[];
  @Input() tableStyles: { [key: string]: string } = {};
  @Input() spacer?: boolean = false;

  cellTemplates: (TemplateRef<any> | null)[] = []; 
  showActions: boolean = false;

  ngOnInit() {
    this.cellTemplates = this.cells.map(cell => {
      if (cell.isBadge) {
        cell.heading = undefined;
      }
      if (cell.value instanceof TemplateRef) {
        return cell.value;
      } else {
        return null;
      }
    });

    if (this.spacer) {
      this.cells.push({ value: '', customStyles: { flex: '1' } });
    }
  }

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  executeAction(action: TableRowAction) {
    action.action(this.rowIndex);
    this.showActions = false;
  }
}
