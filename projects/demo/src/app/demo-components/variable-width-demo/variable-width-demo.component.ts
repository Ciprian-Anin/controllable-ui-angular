import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';
import { NoWrappingWidthTooltipComponent } from '../no-wrapping-width-tooltip/no-wrapping-width-tooltip.component';

@Component({
  selector: 'app-variable-width-demo',
  standalone: true,
  imports: [
    CommonModule,
    BasicTooltipComponent,
    NoWrappingWidthTooltipComponent,
  ],
  templateUrl: './variable-width-demo.component.html',
  styleUrl: './variable-width-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariableWidthDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
