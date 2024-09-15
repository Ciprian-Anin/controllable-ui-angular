import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-zoom-transition-tooltip',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './zoom-transition-tooltip.component.html',
  styleUrl: './zoom-transition-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ZoomTransitionTooltipComponent {
  scrollableContainer = input<ElementRef>();
}
