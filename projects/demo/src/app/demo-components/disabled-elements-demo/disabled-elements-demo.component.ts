import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-disabled-elements-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './disabled-elements-demo.component.html',
  styleUrl: './disabled-elements-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledElementsDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
