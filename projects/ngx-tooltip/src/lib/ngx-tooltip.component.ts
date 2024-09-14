import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnChanges,
  output,
  signal,
  Signal,
  SimpleChanges,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  NgxTooltipArrowComponent,
} from './ngx-tooltip-arrow/ngx-tooltip-arrow.component';
import { Placement } from './types';
import {
  getAvailablePlacementFromTheOnesToBeTried,
  getDialogAvailablePositionConsideringKeepingCurrentPlacement,
} from './utils/availablePosition.utils';
import { getDialogPositionStyle } from './utils/positionStyle.utils';
import {
  generateRandomNumber,
  getScrollableContainer,
  nextTickRender,
} from './utils/utils';

export const defaultOrderOfPlacementsToBeTried: {
  [key in Placement]: [
    preferredPlacement: Placement,
    ...restOfPlacements: Placement[]
  ];
} = {
  'top-start': ['top-start', 'bottom-start', 'left', 'right'],
  top: ['top', 'bottom', 'left', 'right'],
  'top-end': ['top-end', 'bottom-end', 'left', 'right'],

  'left-start': ['left-start', 'right-start', 'top', 'bottom'],
  left: ['left', 'right', 'top', 'bottom'],
  'left-end': ['left-end', 'right-end', 'top', 'bottom'],

  'right-start': ['right-start', 'left-start', 'top', 'bottom'],
  right: ['right', 'left', 'top', 'bottom'],
  'right-end': ['right-end', 'left-end', 'top', 'bottom'],

  'bottom-start': ['bottom-start', 'top-start', 'left', 'right'],
  bottom: ['bottom', 'top', 'left', 'right'],
  'bottom-end': ['bottom-end', 'top-end', 'left', 'right'],
};

type BaseProps = {
  open: Signal<boolean>;
  onOpen$?: () => void;
  onClose$?: () => void;
  preferredPlacement?: Placement;
  orderOfPlacementsToBeTried?: [
    preferredPlacement: Placement,
    ...restOfPlacements: Placement[]
  ];
  triggerActions?: ('hover' | 'focus' | 'click')[];
  /**
   * Distance between relative element and tooltip dialog
   */
  dialogOffset?: number;
  /**
   * Open timeout in ms
   */
  enterDelay?: number;
  /**
   * Close timeout in ms
   */
  leaveDelay?: number;
  arrow?: boolean;
  /**
   * Scrollable container is the one use
   * to track scroll event and position dialog while scrolling inside it.
   */
  scrollableContainer?: HTMLElement;
  tooltipClass?: string;
  tooltipRootClass?: string;
};

export type KeepCurrentPlacementStrategyProps = BaseProps & {
  /**
   * Keep current placement of dialog as time as it remains in
   * min & max sizes boundaries.
   */
  placementStrategy: 'considerKeepingCurrentPlacement';
  /**
   * `dialogMinMaxSizes`:
   *   > In case we need to keep current position, we will use maximum & minimum sizes
   *   > of dialog to check if it fits in current placement, without going over its minimum sizes.
   *   > In case we don't have minimum size available for current placement,
   *   > than will be tried next place from `orderOfPlacementsToBeTried`.
   *
   *   > Maximum size is used to make sure to not have a bigger maximum size on dialog popover.
   *   > (we make sure to override the maximum size in case the available space is smaller than the dialog size)
   */
  dialogMinMaxSizes?: {
    dialogMaxHeight?: number;
    dialogMinHeight?: number;
    dialogMaxWidth?: number;
    dialogMinWidth?: number;
  };
};

/**
 * Dialog placement will be recomputed immediately after we remain
 * without necessary space for dialog on current placement.
 */
export type DefaultStrategyProps = BaseProps & {
  placementStrategy: 'default';
};

export type Props = DefaultStrategyProps | KeepCurrentPlacementStrategyProps;

@Component({
  selector: 'app-ngx-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    NgxTooltipArrowComponent
  ],
  templateUrl: './ngx-tooltip.component.html',
  styleUrl: './ngx-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxTooltipComponent implements OnChanges {
  open = input<boolean>();

  preferredPlacement = input<Placement>('bottom-start');
  orderOfPlacementsToBeTried =
    input<[preferredPlacement: Placement, ...restOfPlacements: Placement[]]>();
  orderOfPlacementsToBeTriedComputed = computed(
    () =>
      this.orderOfPlacementsToBeTried() ||
      defaultOrderOfPlacementsToBeTried[this.preferredPlacement()]
  );

  enterDelay = input<number>(100);
  leaveDelay = input<number>(150);
  triggerActions = input<('hover' | 'focus' | 'click')[]>(['hover', 'focus']);
  arrow = input<boolean>(false);
  dialogOffset = input<number>(5);
  scrollableContainer = input<ElementRef>();
  tooltipRootClass = input<string>();
  tooltipClass = input<string>();

  /**
   * default - Dialog placement will be recomputed immediately after we remain
   * without necessary space for dialog on current placement.
   *
   * considerKeepingCurrentPlacement - Keep current placement of dialog as time as it remains in
   * min & max sizes boundaries.
   */
  placementStrategy = input<
    'default' | 'considerKeepingCurrentPlacement' | undefined
  >('default');

  /**
   *
   * `dialogMinMaxSizes`:
   *   > is used when placementStrategy has value considerKeepingCurrentPlacement
   *   > In case we need to keep current position, we will use maximum & minimum sizes
   *   > of dialog to check if it fits in current placement, without going over its minimum sizes.
   *   > In case we don't have minimum size available for current placement,
   *   > than will be tried next place from `orderOfPlacementsToBeTried`.
   *      *   > Maximum size is used to make sure to not have a bigger maximum size on dialog popover.
   *   > (we make sure to override the maximum size in case the available space is smaller than the dialog size)
   */
  dialogMinMaxSizes = input<{
    dialogMaxHeight?: number;
    dialogMinHeight?: number;
    dialogMaxWidth?: number;
    dialogMinWidth?: number;
  }>();

  onOpen$ = output();
  onClose$ = output();

  arrowSize = computed<number>(() => (this.arrow() ? 12 : 0));
  tooltipId = generateRandomNumber();

  relativeElementRef = viewChild<ElementRef>('relativeElementRef');
  dialogWithBridgeRef = viewChild<ElementRef>('dialogWithBridgeRef');
  dialogRef = viewChild<ElementRef>('dialogRef');

  dialogIsOpenLocalState = signal(this.open());
  dialogPositionStyle = signal<{
    currentPlacement?: Placement;
    value: {
      visibility?: string;
      bottom?: string;
      top?: string;
      left?: string;
      right?: string;
      '--scrollbar-height'?: string;
      '--relative-x'?: string;
      '--relative-y'?: string;
      '--relative-width'?: string;
      '--relative-height'?: string;
      '--dialog-x'?: string;
      '--dialog-y'?: string;
      '--dialog-width'?: string;
      '--dialog-height'?: string;
    };
    maxHeight: string;
    maxWidth: string;
    '--scrollbar-height'?: string;
  }>({
    currentPlacement: undefined,
    value: {},
    maxHeight: '',
    maxWidth: '',
  });
  closeDialogTimeoutID = signal<NodeJS.Timeout | undefined>(undefined);
  openDialogTimeoutID = signal<NodeJS.Timeout | undefined>(undefined);
  dialogAnimationState = signal<'show' | 'hide' | 'initial'>('initial');

  constructor() {
    effect((onCleanup) => {
      if (
        this.dialogIsOpenLocalState() &&
        this.triggerActions()?.includes('click')
      ) {
        window.addEventListener('click', this.handleClickOutsideClose);

        onCleanup(() => {
          window.removeEventListener('click', this.handleClickOutsideClose);
        });
      }
    });

    effect((onCleanup) => {
      if (this.dialogIsOpenLocalState()) {
        const scrollableContainer = getScrollableContainer(
          this.scrollableContainer()?.nativeElement
        );

        scrollableContainer.addEventListener('scroll', this.positionDialog);

        onCleanup(() => {
          scrollableContainer.removeEventListener(
            'scroll',
            this.positionDialog
          );
        });
      }
    });
  }

  positionDialog = async () => {
    if (
      this.dialogWithBridgeRef() &&
      this.dialogRef() &&
      this.relativeElementRef()
    ) {
      // remove maxHeight & maxWidth to compute availableSize properly
      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        maxHeight: '',
        maxWidth: '',
      });
      await nextTickRender(); // wait to have dialog rendered without maxHeight & maxWidth

      // compute placement of dialog using the dialogRef which doesn't include bridge,
      // which is unknown before knowing the next dialog placement.
      // We use dialogOffset to properly take the bridge into account when computing the available space & placement
      const availablePosition =
        this.placementStrategy() === 'considerKeepingCurrentPlacement'
          ? getDialogAvailablePositionConsideringKeepingCurrentPlacement({
              placementsToBeTried: this.orderOfPlacementsToBeTriedComputed(),
              dialogElement: this.dialogRef()!.nativeElement,
              relativeElement: this.relativeElementRef()!.nativeElement,
              currentPlacement: this.dialogPositionStyle().currentPlacement,
              ...this.dialogMinMaxSizes?.(),
            })
          : getAvailablePlacementFromTheOnesToBeTried(
              this.orderOfPlacementsToBeTriedComputed(),
              this.dialogRef()!.nativeElement,
              this.relativeElementRef()!.nativeElement,
            );

      if (availablePosition.type === 'partial-size-available') {
        // in case of partial size available to be displayed,
        // apply the new height or width on element before computing
        // its position for available placement location
        // (for ex. if placement is left this will make sure to always
        // place on left center based on new dialog height obtained
        // after reducing the width of it)
        switch (availablePosition.placement) {
          case 'top-start':
          case 'top':
          case 'top-end':
          case 'bottom-start':
          case 'bottom':
          case 'bottom-end':
            // Note: maxHeight will be set on .ngxTooltip-tooltip
            this.dialogPositionStyle.set({
              ...this.dialogPositionStyle(),
              maxHeight: `${
                availablePosition.availableSize - this.dialogOffset()
              }px`,
            });
            break;
          case 'left-start':
          case 'left':
          case 'left-end':
          case 'right-start':
          case 'right':
          case 'right-end':
            // Note: maxWidth will be set on .ngxTooltip-dialog-with-bridge
            this.dialogPositionStyle.set({
              ...this.dialogPositionStyle(),
              maxWidth: `${availablePosition.availableSize}px`,
            });
            break;
        }

        await nextTickRender(); // wait for new width/height to be rendered,
        // to be able to compute properly, the position of dialog for
        // available placement location
      }

      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        currentPlacement: availablePosition.placement,
      });

      await nextTickRender(); // wait for the placement class to be rendered,
      // in order to have the bridge (padding) applied

      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        value: {
          ...this.dialogPositionStyle().value,
          ...getDialogPositionStyle(
            availablePosition,
            this.dialogWithBridgeRef()!.nativeElement, // dialogWithBridgeRef have the bridge in place in this point
            // so we can properly compute the position, taking into account the bridge
            this.relativeElementRef()!.nativeElement,
            this.scrollableContainer()?.nativeElement
          ),
          '--scrollbar-height': `${
            window.innerHeight - document.documentElement.clientHeight
          }px`,
          // visibility: "visible",
        },
      });

      await nextTickRender(); // wait for the dialog to be rendered on the computed placement

      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        value: {
          ...this.dialogPositionStyle().value,
          ...(this.arrow()
            ? {
                ...(() => {
                  const { x, y, width, height, right, bottom } =
                    this.relativeElementRef()?.nativeElement.getBoundingClientRect() ??
                    {};

                  const scrollableContainerRect = getScrollableContainer(
                    this.scrollableContainer()?.nativeElement
                  ).getBoundingClientRect();

                  return {
                    '--relative-x': `${Math.max(
                      x,
                      scrollableContainerRect.x
                    )}px`,
                    '--relative-y': `${Math.max(
                      y,
                      scrollableContainerRect.y
                    )}px`,
                    '--relative-width': `${Math.min(
                      width,
                      Math.max(
                        0,
                        width -
                          Math.max(0, right - scrollableContainerRect.right) -
                          Math.max(0, scrollableContainerRect.x - x)
                      )
                    )}px`,
                    '--relative-height': `${Math.min(
                      height,
                      Math.max(
                        0,
                        height -
                          Math.max(0, bottom - scrollableContainerRect.bottom) -
                          Math.max(0, scrollableContainerRect.y - y)
                      )
                    )}px`,
                  };
                })(),
                ...(() => {
                  const { x, y, width, height } =
                    this.dialogRef()?.nativeElement.getBoundingClientRect() ??
                    {};

                  return {
                    '--dialog-x': `${x}px`,
                    '--dialog-y': `${y}px`,
                    '--dialog-width': `${width}px`,
                    '--dialog-height': `${height}px`,
                  };
                })(),
              }
            : {}),
        },
      });
    }
  };

  scheduleDialogOpen = async () => {
    // ! check again to make sure we open dialog just if external
    // ! state specify now that the dialog should be opened
    // This check is needed because due to asynchronously downloading
    // the function, it might be downloaded later than scheduleDialogClose
    // an in that case close would take place before scheduleDialogOpen,
    // and this will end up, having dialog open, even if external state
    // specify that it should be closed
    if (this.open()) {
      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        value: {
          ...this.dialogPositionStyle().value,
          visibility: 'hidden',
        },
      });

      await new Promise<void>((resolve, reject) => {
        this.openDialogTimeoutID.set(
          setTimeout(async () => {
            // ! check again to make sure we open dialog just if external
            // ! state specify now that the dialog should be opened

            if (this.open()) {
              try {
                await nextTickRender(); // wait for dialog to have `visibility: hidden` set
                // before showing it
                // This is important in order to avoid the display of it on a position
                // inappropriate with requested/available placement
                // * (at this moment we don't have the dialog sizes,
                // * and it is not positioned on requested/available placement)

                const positionDialogAndMakeItVisible = new ResizeObserver(
                  async () => {
                    try {
                      await this.positionDialog();
                      await this.positionDialog(); // call a second time to make sure that the size of dialog is computed properly
                      // (the first time when we call positionDialog the browser doesn't compute the height/width of dialog properly)

                      this.dialogPositionStyle.set({
                        ...this.dialogPositionStyle(),
                        value: {
                          ...this.dialogPositionStyle().value,
                          visibility: 'visible',
                        },
                      });

                      this.dialogAnimationState.set('show');
                      resolve();

                      positionDialogAndMakeItVisible.disconnect();
                    } catch {
                      reject();
                    }
                  }
                );

                if (this.dialogRef()) {
                  positionDialogAndMakeItVisible.observe(
                    this.dialogRef()!.nativeElement
                  );
                  this.dialogWithBridgeRef()?.nativeElement.showPopover();
                  this.dialogIsOpenLocalState.set(true);
                }
              } catch {
                reject();
              }
            }
          }, this.enterDelay())
        );
      });
    }
  };

  closeDialog = () => {
    // ! check again to make sure we close dialog just if external
    // ! state specify now that the dialog should be closed
    if (!this.open()) {
      this.dialogWithBridgeRef()?.nativeElement.hidePopover();
      this.dialogIsOpenLocalState.set(false);

      this.dialogPositionStyle.set({
        ...this.dialogPositionStyle(),
        currentPlacement: undefined,
        value: {},
        maxHeight: '',
        maxWidth: '',
      });

      const scrollableContainer = getScrollableContainer(
        this.scrollableContainer()?.nativeElement
      );
      scrollableContainer.removeEventListener('scroll', this.positionDialog);
    }
  };

  scheduleDialogClose = async () => {
    // check again to make sure we close dialog just if external
    // state specify now that the dialog should be closed
    if (!this.open()) {
      this.dialogAnimationState.set('hide');

      await new Promise<void>((resolve, reject) => {
        this.closeDialogTimeoutID.set(
          setTimeout(() => {
            try {
              this.closeDialog();
              resolve();
            } catch (error) {
              reject();
            }
          }, this.leaveDelay())
        );
      });
    }
  };

  cancelDialogOpen = () => {
    clearTimeout(this.openDialogTimeoutID());
    this.openDialogTimeoutID.set(undefined);
    this.dialogAnimationState.set('hide');
  };

  cancelDialogClose = () => {
    clearTimeout(this.closeDialogTimeoutID());
    this.closeDialogTimeoutID.set(undefined);
    this.dialogAnimationState.set('show');
  };

  handleClickOutsideClose = async (event: Event) => {
    if (
      this.dialogWithBridgeRef()?.nativeElement !== event.target &&
      !this.dialogWithBridgeRef()?.nativeElement.contains(
        event.target as Node
      ) &&
      this.relativeElementRef()?.nativeElement !== event.target &&
      !this.relativeElementRef()?.nativeElement.contains(event.target as Node)
    ) {
      this.onClose$?.emit();
    }
  };

  handleOpenAction = () => {
    this.onOpen$?.emit();
  };

  async ngOnChanges(changes: SimpleChanges) {
    if ('open' in changes) {
      await this.toggleVisibility();
    }
  }

  private toggleVisibility = async () => {
    const shouldDialogOpen = this.open();

    if (shouldDialogOpen) {
      this.cancelDialogClose();
      await this.scheduleDialogOpen();
    } else {
      this.cancelDialogOpen();
      if (this.dialogIsOpenLocalState()) {
        await this.scheduleDialogClose();
      }
    }
  };

  handleRelativeElementMouseOrFocusLeave = (event: MouseEvent | FocusEvent) => {
    if (
      this.dialogWithBridgeRef()?.nativeElement !== event.relatedTarget &&
      !this.dialogWithBridgeRef()?.nativeElement.contains(
        event.relatedTarget as Node
      )
    ) {
      this.onClose$.emit();
    }
  };

  handleMouseOrFocusLeaveDialog = async (event: MouseEvent | FocusEvent) => {
    if (
      this.relativeElementRef()?.nativeElement !== event.relatedTarget &&
      !this.relativeElementRef()?.nativeElement.contains(
        event.relatedTarget as Node
      )
    ) {
      this.onClose$.emit();
    }
  };

  handleMouseEnter = async () => {
    this.onOpen$?.emit(); // emit open to parent to make sure it will have open state also
    await this.cancelDialogClose();
  };
}
