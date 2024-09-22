import { Placement } from '../types';
import { getDocumentHeight, getDocumentWidth } from './utils';

/**
 * In order to avoid the annoying flickering from top to bottom or from left to right
 * in case one side size has mare space than other, after we already have dialog placed on a side,
 * we should try to keep dialog on current placement until min size is hit.
 *
 * When it is first opened it should be positioned were is the most space and
 * it should remain there, decreasing height as much as we can
 * (until we hit min-height / min-width) and after trying to position it
 * on opposed side if there is more space (even if it needs a small decrease of height
 * on the opposed side, than the default height)
 * * (basically trying all placements in the order defined in placementsToBeTried)
 *
 */
export function getDialogAvailablePositionConsideringKeepingCurrentPlacement({
  placementsToBeTried,
  currentPlacement,
  dialogElement,
  relativeElement,
  dialogMaxHeight = Infinity,
  dialogMinHeight = 0,
  dialogMaxWidth = Infinity,
  dialogMinWidth = 0,
}: {
  placementsToBeTried: [
    preferredPlacement: Placement,
    ...restOfPlacements: Placement[]
  ];
  currentPlacement: Placement | undefined;
  dialogElement: HTMLElement;
  relativeElement: HTMLElement;
  dialogMaxHeight?: number;
  dialogMinHeight?: number;
  dialogMaxWidth?: number;
  dialogMinWidth?: number;
}) {
  switch (currentPlacement) {
    case 'top-start':
    case 'top':
    case 'top-end': {
      // decrease height to fit on top; if min-height was hit try to place again on placementsToBeTried
      const maxAvailableSpaceOnTop = getMaxAvailableSpaceOnTop(relativeElement);
      return maxAvailableSpaceOnTop < dialogMinHeight
        ? getAvailablePlacementFromTheOnesToBeTried(
            placementsToBeTried,
            dialogElement,
            relativeElement
          )
        : maxAvailableSpaceOnTop > dialogMaxHeight
        ? {
            type: 'full-size-available' as const,
            placement: currentPlacement,
          }
        : {
            type: 'partial-size-available' as const,
            placement: currentPlacement,
            availableSize: maxAvailableSpaceOnTop,
          };
    }
    case 'bottom-start':
    case 'bottom':
    case 'bottom-end': {
      // decrease height to fit on bottom; if min-height was hit try to place again on placementsToBeTried
      const maxAvailableSpaceOnBottom =
        getMaxAvailableSpaceOnBottom(relativeElement);
      return maxAvailableSpaceOnBottom < dialogMinHeight
        ? getAvailablePlacementFromTheOnesToBeTried(
            placementsToBeTried,
            dialogElement,
            relativeElement
          )
        : maxAvailableSpaceOnBottom > dialogMaxHeight
        ? {
            type: 'full-size-available' as const,
            placement: currentPlacement,
          }
        : {
            type: 'partial-size-available' as const,
            placement: currentPlacement,
            availableSize: maxAvailableSpaceOnBottom,
          };
    }
    case 'left-start':
    case 'left':
    case 'left-end': {
      // decrease height to fit on left; if min-width was hit try to place again on placementsToBeTried
      const maxAvailableSpaceOnLeft =
        getMaxAvailableSpaceOnLeft(relativeElement);
      return maxAvailableSpaceOnLeft < dialogMinWidth
        ? getAvailablePlacementFromTheOnesToBeTried(
            placementsToBeTried,
            dialogElement,
            relativeElement
          )
        : maxAvailableSpaceOnLeft > dialogMaxWidth
        ? {
            type: 'full-size-available' as const,
            placement: currentPlacement,
          }
        : {
            type: 'partial-size-available' as const,
            placement: currentPlacement,
            availableSize: maxAvailableSpaceOnLeft,
          };
    }
    case 'right-start':
    case 'right':
    case 'right-end': {
      // decrease height to fit on right; if min-width was hit try to place again on placementsToBeTried
      const maxAvailableSpaceOnRight =
        getMaxAvailableSpaceOnRight(relativeElement);
      return maxAvailableSpaceOnRight < dialogMinWidth
        ? getAvailablePlacementFromTheOnesToBeTried(
            placementsToBeTried,
            dialogElement,
            relativeElement
          )
        : maxAvailableSpaceOnRight > dialogMaxWidth
        ? {
            type: 'full-size-available' as const,
            placement: currentPlacement,
          }
        : {
            type: 'partial-size-available' as const,
            placement: currentPlacement,
            availableSize: maxAvailableSpaceOnRight,
          };
    }
    default: {
      return getAvailablePlacementFromTheOnesToBeTried(
        placementsToBeTried,
        dialogElement,
        relativeElement
      );
    }
  }
}

export function getAvailablePlacementFromTheOnesToBeTried(
  placementsToBeTried: [
    preferredPlacement: Placement,
    ...restOfPlacements: Placement[]
  ],
  dialogElement: HTMLElement,
  relativeElement: HTMLElement
) {
  const dialogElementRect = dialogElement.getBoundingClientRect();
  const relativeElementRect = relativeElement.getBoundingClientRect();

  const placementWithFullAvailableSpace = placementsToBeTried.find(
    (placementToBeTried) => {
      switch (placementToBeTried) {
        case 'top-start':
        case 'top':
        case 'top-end': {
          return relativeElementRect.top - dialogElementRect.height >= 0;
        }
        case 'bottom-start':
        case 'bottom':
        case 'bottom-end': {
          return (
            relativeElementRect.bottom + dialogElementRect.height <=
            getDocumentHeight()
          );
        }
        case 'left-start':
        case 'left':
        case 'left-end': {
          return relativeElementRect.left - dialogElementRect.width >= 0;
        }
        case 'right-start':
        case 'right':
        case 'right-end': {
          return (
            relativeElementRect.right + dialogElementRect.width <=
            getDocumentWidth()
          );
        }
      }
    }
  );

  if (placementWithFullAvailableSpace) {
    return {
      type: 'full-size-available' as const,
      placement: placementWithFullAvailableSpace,
    };
  } else {
    return {
      type: 'partial-size-available' as const,
      ...getMaxPartialAvailableSpace(placementsToBeTried, relativeElement),
    };
  }
}

function getMaxPartialAvailableSpace(
  placementsToBeTried: [
    preferredPlacement: Placement,
    ...restOfPlacements: Placement[]
  ],
  relativeElement: HTMLElement
) {
  const availableSizeOfPlacementsToBeTried = placementsToBeTried.map(
    (currentPlacementToBeTried) => ({
      placement: currentPlacementToBeTried,
      availableSize: computeMaxAvailableSizeOfDialogForPlacement(
        currentPlacementToBeTried,
        relativeElement
      ),
    })
  );

  const placementWithMaxAvailableSpace =
    availableSizeOfPlacementsToBeTried.reduce<{
      placement: Placement;
      availableSize: number;
    }>((acc, value) => {
      return acc.availableSize >= value.availableSize ? acc : value;
    }, availableSizeOfPlacementsToBeTried[0]);

  return placementWithMaxAvailableSpace;
}

function getMaxAvailableSpaceOnTop(relativeElement: HTMLElement) {
  const relativeElementRect = relativeElement.getBoundingClientRect();

  return relativeElementRect.top;
}

function getMaxAvailableSpaceOnBottom(relativeElement: HTMLElement) {
  const relativeElementRect = relativeElement.getBoundingClientRect();

  return getDocumentHeight() - relativeElementRect.bottom;
}

function getMaxAvailableSpaceOnLeft(relativeElement: HTMLElement) {
  const relativeElementRect = relativeElement.getBoundingClientRect();

  return relativeElementRect.left;
}

function getMaxAvailableSpaceOnRight(relativeElement: HTMLElement) {
  const relativeElementRect = relativeElement.getBoundingClientRect();

  return getDocumentWidth() - relativeElementRect.right;
}

function computeMaxAvailableSizeOfDialogForPlacement(
  placement: Placement,
  relativeElement: HTMLElement
) {
  switch (placement) {
    case 'top-start':
    case 'top':
    case 'top-end': {
      return getMaxAvailableSpaceOnTop(relativeElement);
    }
    case 'bottom-start':
    case 'bottom':
    case 'bottom-end': {
      return getMaxAvailableSpaceOnBottom(relativeElement);
    }
    case 'left-start':
    case 'left':
    case 'left-end': {
      return getMaxAvailableSpaceOnLeft(relativeElement);
    }
    case 'right-start':
    case 'right':
    case 'right-end': {
      return getMaxAvailableSpaceOnRight(relativeElement);
    }
  }
}
