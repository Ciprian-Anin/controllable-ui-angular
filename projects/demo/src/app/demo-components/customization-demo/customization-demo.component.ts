import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
} from '@angular/core';

import { BootstrapTooltipCustomizedComponent } from '../bootstrap-tooltip-customized/bootstrap-tooltip-customized.component';
import { HtmlContentTooltipCustomizedComponent } from '../html-content-tooltip-customized/html-content-tooltip-customized.component';
import { LightTooltipCustomizedComponent } from '../light-tooltip-customized/light-tooltip-customized.component';
import { TooltipWithCloseActionDemoComponent } from '../tooltip-with-close-action-demo/tooltip-with-close-action-demo.component';

@Component({
  selector: 'app-customization-demo',
  standalone: true,
  imports: [
    CommonModule,

    LightTooltipCustomizedComponent,
    BootstrapTooltipCustomizedComponent,
    HtmlContentTooltipCustomizedComponent,
    TooltipWithCloseActionDemoComponent,
  ],
  templateUrl: './customization-demo.component.html',
  styleUrl: './customization-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationDemoComponent {
  scrollableContainerElement = input<ElementRef>();
}
