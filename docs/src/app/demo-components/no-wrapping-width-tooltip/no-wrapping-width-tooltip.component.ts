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
  selector: 'app-no-wrapping-width-tooltip',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './no-wrapping-width-tooltip.component.html',
  styleUrl: './no-wrapping-width-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NoWrappingWidthTooltipComponent {
  scrollableContainer = input<ElementRef>();
}
