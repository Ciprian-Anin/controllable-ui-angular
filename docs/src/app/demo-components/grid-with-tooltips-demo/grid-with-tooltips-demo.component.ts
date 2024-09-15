import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-grid-with-tooltips-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './grid-with-tooltips-demo.component.html',
  styleUrl: './grid-with-tooltips-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridWithTooltipsDemoComponent {
  scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');

  placements = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'right-start',
    'right',
    'right-end',
  ] as const;

  grid = Array.from({
    length: this.placements.length * (this.placements.length + 1),
  }).fill(0);
}
