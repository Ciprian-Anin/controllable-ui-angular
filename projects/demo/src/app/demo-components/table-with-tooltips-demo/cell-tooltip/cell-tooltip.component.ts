import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
} from '@angular/core';

import { NgxTooltipComponent } from '@controllable-ui/ngx-tooltip';

@Component({
  selector: 'app-cell-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    NgxTooltipComponent
  ],
  templateUrl: './cell-tooltip.component.html',
  styleUrl: './cell-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTooltipComponent {
  scrollableContainer = input.required<ElementRef<any>>();
  cellValue = input.required<string>();
  dialogIsOpen = signal<boolean>(false);

  handleOpen$ = () => {
    this.dialogIsOpen.set(true);
  };

  handleClose$ = () => {
    this.dialogIsOpen.set(false);
  };
}
