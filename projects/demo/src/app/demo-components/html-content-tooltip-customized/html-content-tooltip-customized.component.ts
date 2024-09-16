import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgxTooltipComponent } from '@controllable-ui/ngx-tooltip';

@Component({
  selector: 'app-html-content-tooltip-customized',
  standalone: true,
  imports: [
    CommonModule,
    NgxTooltipComponent
  ],
  templateUrl: './html-content-tooltip-customized.component.html',
  styleUrl: './html-content-tooltip-customized.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HtmlContentTooltipCustomizedComponent {
  scrollableContainer = input<ElementRef>();

  dialogIsOpen = signal<boolean>(false);

  handleOpen$ = () => {
    this.dialogIsOpen.set(true);
  };

  handleClose$ = () => {
    this.dialogIsOpen.set(false);
  };
}
