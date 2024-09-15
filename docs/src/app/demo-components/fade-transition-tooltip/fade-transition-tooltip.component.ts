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
  selector: 'app-fade-transition-tooltip',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './fade-transition-tooltip.component.html',
  styleUrl: './fade-transition-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FadeTransitionTooltipComponent {
  scrollableContainer = input<ElementRef>();
}
