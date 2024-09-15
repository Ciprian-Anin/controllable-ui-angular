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
  selector: 'app-bootstrap-tooltip-customized',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './bootstrap-tooltip-customized.component.html',
  styleUrl: './bootstrap-tooltip-customized.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BootstrapTooltipCustomizedComponent {
  scrollableContainer = input<ElementRef>();
}
