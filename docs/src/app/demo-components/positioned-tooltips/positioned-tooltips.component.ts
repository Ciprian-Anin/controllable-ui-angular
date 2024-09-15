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
  selector: 'app-positioned-tooltips',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './positioned-tooltips.component.html',
  styleUrl: './positioned-tooltips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PositionedTooltipsComponent {
  scrollableContainer = input<ElementRef>();
}
