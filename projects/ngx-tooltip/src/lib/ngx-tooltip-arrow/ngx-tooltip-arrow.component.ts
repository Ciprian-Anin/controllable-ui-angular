import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-tooltip-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-tooltip-arrow.component.html',
  styleUrl: './ngx-tooltip-arrow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxTooltipArrowComponent {
  arrowSize = input<number>();
}
