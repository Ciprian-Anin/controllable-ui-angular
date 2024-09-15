import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';

@Component({
  selector: 'app-positioned-tooltip-with-long-content',
  standalone: true,
  imports: [CommonModule, BasicTooltipComponent],
  templateUrl: './positioned-tooltip-with-long-content.component.html',
  styleUrl: './positioned-tooltip-with-long-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PositionedTooltipWithLongContentComponent {
  scrollableContainer = input<ElementRef>();

  loremIpsumLongText =
    signal<string>(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat justo id libero mollis, at pharetra ligula eleifend. Integer gravida euismod massa, vel volutpat sapien tincidunt id. Phasellus nec lectus suscipit, lacinia lacus ac, vehicula orci. Suspendisse potenti. Mauris sit amet tincidunt libero. Nulla facilisi. Proin eget erat nec metus tempor aliquam non non lectus. Curabitur suscipit, ligula at pretium sollicitudin, lorem orci dictum odio, ut feugiat lacus justo sit amet est.

    Aenean laoreet accumsan nulla, nec vehicula orci venenatis nec. Donec sollicitudin arcu nec urna tincidunt, id convallis eros tempus. In pharetra ipsum et sollicitudin aliquam. Pellentesque a nisi nunc. Nulla facilisi. Vivamus sed lorem a lorem scelerisque fermentum. Sed lacinia orci quis libero gravida, at pretium sem sollicitudin. Ut id magna vitae est dignissim sodales. Etiam et malesuada mi, sed tempor lacus.`);
}
