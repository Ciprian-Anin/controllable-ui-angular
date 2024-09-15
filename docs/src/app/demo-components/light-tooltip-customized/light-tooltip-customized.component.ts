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
  selector: 'app-light-tooltip-customized',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './light-tooltip-customized.component.html',
  styleUrl: './light-tooltip-customized.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LightTooltipCustomizedComponent {
  scrollableContainer = input<ElementRef>();
}
