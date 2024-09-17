import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-triggers-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './triggers-demo.component.html',
  styleUrl: './triggers-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggersDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
