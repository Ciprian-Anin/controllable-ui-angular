import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

import { CellTooltipComponent } from './cell-tooltip/cell-tooltip.component';

@Component({
  selector: 'app-table-with-tooltips-demo',
  standalone: true,
  imports: [
    // ANGULAR
    CommonModule,

    // COMPONENTS
    CellTooltipComponent,
  ],
  templateUrl: './table-with-tooltips-demo.component.html',
  styleUrl: './table-with-tooltips-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWithTooltipsDemoComponent {
  scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');

  rows = Array.from({ length: 30 }).fill(0);
  cols = Array.from({ length: 30 }).fill(0);
}
