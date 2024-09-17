import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BasicTooltipComponent } from '../basic-tooltip/basic-tooltip.component';
import { FadeTransitionTooltipComponent } from '../fade-transition-tooltip/fade-transition-tooltip.component';
import { ZoomTransitionTooltipComponent } from '../zoom-transition-tooltip/zoom-transition-tooltip.component';

@Component({
  selector: 'app-transitions-demo',
  standalone: true,
  imports: [
    CommonModule,
    BasicTooltipComponent,
    FadeTransitionTooltipComponent,
    ZoomTransitionTooltipComponent,
  ],
  templateUrl: './transitions-demo.component.html',
  styleUrl: './transitions-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransitionsDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
