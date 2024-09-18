import { CommonModule } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { BasicTooltipComponent } from './demo-components/basic-tooltip/basic-tooltip.component';
import { CustomizationDemoComponent } from './demo-components/customization-demo/customization-demo.component';
import { DisabledElementsDemoComponent } from './demo-components/disabled-elements-demo/disabled-elements-demo.component';
import { GridWithTooltipsDemoComponent } from './demo-components/grid-with-tooltips-demo/grid-with-tooltips-demo.component';
import { InteractiveDemoComponent } from './demo-components/interactive-demo/interactive-demo.component';
import { PositionedTooltipWithLongContentComponent } from './demo-components/positioned-tooltip-with-long-content/positioned-tooltip-with-long-content.component';
import { PositionedTooltipsComponent } from './demo-components/positioned-tooltips/positioned-tooltips.component';
import { ShowingAndHidingWithDelayDemoComponent } from './demo-components/showing-and-hiding-with-delay-demo/showing-and-hiding-with-delay-demo.component';
import { CellTooltipComponent } from './demo-components/table-with-tooltips-demo/cell-tooltip/cell-tooltip.component';
import { TableWithTooltipsDemoComponent } from './demo-components/table-with-tooltips-demo/table-with-tooltips-demo.component';
import { TooltipCornersSquareDemoComponent } from './demo-components/tooltip-corners-square-demo/tooltip-corners-square-demo.component';
import { TooltipWithArrowComponent } from './demo-components/tooltip-with-arrow/tooltip-with-arrow.component';
import { TooltipWithDistanceFromAnchorComponent } from './demo-components/tooltip-with-distance-from-anchor/tooltip-with-distance-from-anchor.component';
import { TransitionsDemoComponent } from './demo-components/transitions-demo/transitions-demo.component';
import { TriggersDemoComponent } from './demo-components/triggers-demo/triggers-demo.component';
import { VariableWidthDemoComponent } from './demo-components/variable-width-demo/variable-width-demo.component';
import { DemoComponent } from './demo/demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // ANGULAR
    RouterOutlet,
    CommonModule,

    MarkdownModule,

    // CUSTOM COMPONENTS
    CellTooltipComponent,
    TableWithTooltipsDemoComponent,
    PositionedTooltipsComponent,
    TooltipCornersSquareDemoComponent,
    GridWithTooltipsDemoComponent,
    BasicTooltipComponent,
    DemoComponent,
    TooltipWithArrowComponent,
    TooltipWithDistanceFromAnchorComponent,
    PositionedTooltipWithLongContentComponent,
    CustomizationDemoComponent,
    TriggersDemoComponent,
    VariableWidthDemoComponent,
    InteractiveDemoComponent,
    DisabledElementsDemoComponent,
    TransitionsDemoComponent,
    ShowingAndHidingWithDelayDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-tooltip';
  scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');

  scrollableContainerCode = `scrollableContainerElement = viewChild<ElementRef>('scrollableContainer');`;

  tooltipHtmlCode = `<ngx-tooltip
  [scrollableContainer]="scrollableContainer()"
  [tooltipRootClass]="tooltipRootClass()"
  [arrow]="arrow()"
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
</ngx-tooltip>`;

  tsFileCode = `scrollableContainer = input<ElementRef<any>>();
tooltipRootClass = input<string>();
arrow = input<boolean>(false);

dialogIsOpen = signal<boolean>(false);

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
