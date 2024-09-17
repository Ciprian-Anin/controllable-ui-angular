import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-interactive-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './interactive-demo.component.html',
  styleUrl: './interactive-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
