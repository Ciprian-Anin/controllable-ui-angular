import { CommonModule } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BasicTooltipComponent } from './demo-components/basic-tooltip/basic-tooltip.component';
import { BootstrapTooltipCustomizedComponent } from './demo-components/bootstrap-tooltip-customized/bootstrap-tooltip-customized.component';
import { FadeTransitionTooltipComponent } from './demo-components/fade-transition-tooltip/fade-transition-tooltip.component';
import { GridWithTooltipsDemoComponent } from './demo-components/grid-with-tooltips-demo/grid-with-tooltips-demo.component';
import { HtmlContentTooltipCustomizedComponent } from './demo-components/html-content-tooltip-customized/html-content-tooltip-customized.component';
import { LightTooltipCustomizedComponent } from './demo-components/light-tooltip-customized/light-tooltip-customized.component';
import { NoWrappingWidthTooltipComponent } from './demo-components/no-wrapping-width-tooltip/no-wrapping-width-tooltip.component';
import { PositionedTooltipWithLongContentComponent } from './demo-components/positioned-tooltip-with-long-content/positioned-tooltip-with-long-content.component';
import { PositionedTooltipsComponent } from './demo-components/positioned-tooltips/positioned-tooltips.component';
import { CellTooltipComponent } from './demo-components/table-with-tooltips-demo/cell-tooltip/cell-tooltip.component';
import { TableWithTooltipsDemoComponent } from './demo-components/table-with-tooltips-demo/table-with-tooltips-demo.component';
import { TooltipCornersSquareDemoComponent } from './demo-components/tooltip-corners-square-demo/tooltip-corners-square-demo.component';
import { TooltipWithArrowComponent } from './demo-components/tooltip-with-arrow/tooltip-with-arrow.component';
import { TooltipWithCloseActionDemoComponent } from './demo-components/tooltip-with-close-action-demo/tooltip-with-close-action-demo.component';
import { TooltipWithDistanceFromAnchorComponent } from './demo-components/tooltip-with-distance-from-anchor/tooltip-with-distance-from-anchor.component';
import { ZoomTransitionTooltipComponent } from './demo-components/zoom-transition-tooltip/zoom-transition-tooltip.component';
import { DemoComponent } from './demo/demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // ANGULAR
    RouterOutlet,
    CommonModule,

    // CUSTOM COMPONENTS
    CellTooltipComponent,
    TableWithTooltipsDemoComponent,
    TooltipWithCloseActionDemoComponent,
    HtmlContentTooltipCustomizedComponent,
    PositionedTooltipsComponent,
    TooltipCornersSquareDemoComponent,
    GridWithTooltipsDemoComponent,
    BasicTooltipComponent,
    DemoComponent,
    LightTooltipCustomizedComponent,
    BootstrapTooltipCustomizedComponent,
    TooltipWithArrowComponent,
    TooltipWithDistanceFromAnchorComponent,
    NoWrappingWidthTooltipComponent,
    FadeTransitionTooltipComponent,
    ZoomTransitionTooltipComponent,
    PositionedTooltipWithLongContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-tooltip';
  scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');

  scrollableContainerCode = `scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');`;

  tooltipHtmlCode = `<app-ngx-tooltip
  [scrollableContainer]="scrollableContainer()"
  [open]="dialogIsOpen()"
  (onOpen$)="handleOpen$()"
  (onClose$)="handleClose$()"
>
  <span class="relative-element">
    <ng-content select=".relative-element" />
  </span>
  <span class="message">
    <ng-content select=".message" />
  </span>
</app-ngx-tooltip>`;

  openCloseCode = `dialogIsOpen = signal<boolean>(false);

handleOpen$ = () => {
  this.dialogIsOpen.set(true);
};

handleClose$ = () => {
  this.dialogIsOpen.set(false);
};`;

  basicTooltipHTMLCode = `<app-basic-tooltip
  [scrollableContainer]="scrollableContainer()"
  [tooltipRootClass]="'ngxTooltipDemo-bootstrap-example'"
  [arrow]="true"
>
  <button class="relative-element">BOOTSTRAP</button>
  <span class="message"> Add </span>
</app-basic-tooltip>`;

  scssCode = `.ngxTooltipDemo-bootstrap-example {
  .ngxTooltip-tooltip {
    font-size: 11px;
    font-weight: 500;
    color: white;
    background-color: black;
  }

  .ngxTooltip-arrow {
    color: black;

    svg {
      filter: none;
    }
  }
}`;
}
