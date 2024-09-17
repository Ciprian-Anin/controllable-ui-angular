import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import {
  NgxTooltipComponent,
  Placement,
} from '@controllable-ui/ngx-tooltip';

@Component({
  selector: 'app-basic-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    NgxTooltipComponent,
],
  templateUrl: './basic-tooltip.component.html',
  styleUrl: './basic-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BasicTooltipComponent {
  arrow = input<boolean>(false);
  // triggerActions = input<('hover' | 'focus' | 'click')[]>(['click']);
  triggerActions = input<('hover' | 'focus' | 'click')[]>(['hover', 'focus']);
  tooltipRootClass = input<string>();
  preferredPlacement = input<Placement>('bottom');
  placementStrategy = input<'default' | 'considerKeepingCurrentPlacement'>(
    'default'
  );
  dialogOffset = input<number>(5);

  dialogMinMaxSizes = input<{
    dialogMaxHeight?: number;
    dialogMinHeight?: number;
    dialogMaxWidth?: number;
    dialogMinWidth?: number;
  }>();

  scrollableContainer = input<ElementRef<any>>();
  enterDelay = input<number>(100);
  leaveDelay = input<number>(150);

  dialogIsOpen = signal<boolean>(false);

  handleOpen$ = () => {
    this.dialogIsOpen.set(true);
  };

  handleClose$ = () => {
    this.dialogIsOpen.set(false);
  };
}
