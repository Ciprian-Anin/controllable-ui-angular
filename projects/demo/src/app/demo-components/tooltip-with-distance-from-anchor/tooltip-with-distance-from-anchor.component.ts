import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  BasicTooltipComponent,
} from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-tooltip-with-distance-from-anchor',
  standalone: true,
  imports: [CommonModule, FormsModule, BasicTooltipComponent],
  templateUrl: './tooltip-with-distance-from-anchor.component.html',
  styleUrl: './tooltip-with-distance-from-anchor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipWithDistanceFromAnchorComponent {
  scrollableContainer = input<ElementRef>();

  offset = signal<number>(0);
  withArrow = signal<boolean>(false);
}
