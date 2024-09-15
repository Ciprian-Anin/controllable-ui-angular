import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BasicTooltipComponent } from '../demo-components/basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  title = input.required<string>();
  codeLink = input.required<string>();
}
