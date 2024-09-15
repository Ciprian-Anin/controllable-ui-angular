import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-tooltip-corners-square-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './tooltip-corners-square-demo.component.html',
  styleUrl: './tooltip-corners-square-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipCornersSquareDemoComponent {
  scrollableContainer = input<ElementRef>();
}
