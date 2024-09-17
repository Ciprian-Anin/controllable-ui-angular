import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-showing-and-hiding-with-delay-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './showing-and-hiding-with-delay-demo.component.html',
  styleUrl: './showing-and-hiding-with-delay-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingAndHidingWithDelayDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
