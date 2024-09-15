import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-tooltip-with-arrow',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './tooltip-with-arrow.component.html',
  styleUrl: './tooltip-with-arrow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipWithArrowComponent {
  scrollableContainer = input<ElementRef>();
}
