import { Placement } from '../types';
import {
  getDocumentHeight,
  getDocumentWidth,
} from './utils';

export function getBottomEndPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { right, bottom } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustBottomToBeAtMostAtTheBottomEdgeOfScrollableContainer(
      bottom,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      right - dialogElementRect.width,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getBottomPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, bottom, width } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustBottomToBeAtMostAtTheBottomEdgeOfScrollableContainer(
      bottom,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      x + width / 2 - dialogElementRect.width / 2,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getBottomStartPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, bottom } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustBottomToBeAtMostAtTheBottomEdgeOfScrollableContainer(
      bottom,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      x,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getRightEndPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { right, bottom } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      bottom - dialogElementRect.height,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustRightToBeAtMostAtTheRightEdgeOfScrollableContainer(
      right,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getRightPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { right, y, height } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      y + height / 2 - dialogElementRect.height / 2,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustRightToBeAtMostAtTheRightEdgeOfScrollableContainer(
      right,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getRightStartPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { right, y } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      y,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${ensureAdjustRightToBeAtMostAtTheRightEdgeOfScrollableContainer(
      right,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getLeftEndPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, bottom } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      bottom - dialogElementRect.height,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${
      ensureAdjustXToBeAtMostAtTheLeftEdgeOfScrollableContainer(
        x,
        scrollableContainer
      ) - dialogElementRect.width
    }px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getLeftPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, y, height } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      y + height / 2 - dialogElementRect.height / 2,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${
      ensureAdjustXToBeAtMostAtTheLeftEdgeOfScrollableContainer(
        x,
        scrollableContainer
      ) - dialogElementRect.width
    }px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getLeftStartPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, y } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${ensureAdjustYToHaveHeightInsideView(
      y,
      dialogElementRect.height,
      scrollableContainer
    )}px`,
    left: `${
      ensureAdjustXToBeAtMostAtTheLeftEdgeOfScrollableContainer(
        x,
        scrollableContainer
      ) - dialogElementRect.width
    }px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getTopEndPositionStyle({
  relativeElement,
  dialogElement,
  scrollableContainer,
}: {
  relativeElement: HTMLElement;
  dialogElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { y, right } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${
      ensureAdjustYToBeAtMostAtTheTopEdgeOfScrollableContainer(
        y,
        scrollableContainer
      ) - dialogElementRect.height
    }px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      right - dialogElementRect.width,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function ensureAdjustXToHaveWidthInsideView(
  x: number,
  dialogWidth: number,
  scrollableContainer?: HTMLElement
) {
  const rightEdgeOfView = scrollableContainer
    ? Math.min(
        getDocumentWidth(),
        scrollableContainer.getBoundingClientRect().right
      )
    : getDocumentWidth();

  const getLeftEdgeOfView = () =>
    scrollableContainer
      ? Math.max(0, scrollableContainer.getBoundingClientRect().left)
      : 0;

  const sizeOutsideRightSide = x + dialogWidth - rightEdgeOfView;
  const adjustedX =
    sizeOutsideRightSide > 0
      ? Math.max(x - sizeOutsideRightSide, 0)
      : Math.max(x, getLeftEdgeOfView());

  return Math.round(adjustedX);
}

export function ensureAdjustYToBeAtMostAtTheTopEdgeOfScrollableContainer(
  y: number,
  scrollableContainer?: HTMLElement
) {
  return scrollableContainer
    ? Math.max(y, scrollableContainer?.getBoundingClientRect().y)
    : y;
}

export function ensureAdjustBottomToBeAtMostAtTheBottomEdgeOfScrollableContainer(
  bottom: number,
  scrollableContainer?: HTMLElement
) {
  return scrollableContainer
    ? Math.min(bottom, scrollableContainer.getBoundingClientRect().bottom)
    : bottom;
}

export function ensureAdjustXToBeAtMostAtTheLeftEdgeOfScrollableContainer(
  x: number,
  scrollableContainer?: HTMLElement
) {
  return scrollableContainer
    ? Math.max(x, scrollableContainer.getBoundingClientRect().x)
    : x;
}

export function ensureAdjustRightToBeAtMostAtTheRightEdgeOfScrollableContainer(
  right: number,
  scrollableContainer?: HTMLElement
) {
  return scrollableContainer
    ? Math.min(right, scrollableContainer.getBoundingClientRect().right)
    : right;
}

export function ensureAdjustYToHaveHeightInsideView(
  y: number,
  dialogHeight: number,
  scrollableContainer?: HTMLElement
) {
  const bottomEdgeOfView = scrollableContainer
    ? Math.min(
        getDocumentHeight(),
        scrollableContainer.getBoundingClientRect().bottom
      )
    : getDocumentHeight();

  const getTopEdgeOfView = () =>
    scrollableContainer
      ? Math.max(0, scrollableContainer.getBoundingClientRect().top)
      : 0;

  const sizeOutside = y + dialogHeight - bottomEdgeOfView;
  const adjustedY =
    sizeOutside > 0
      ? Math.max(y - sizeOutside, 0)
      : Math.max(y, getTopEdgeOfView());

  return adjustedY;
}

export function getTopStartPositionStyle({
  dialogElement,
  relativeElement,
  scrollableContainer,
}: {
  dialogElement: HTMLElement;
  relativeElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, y } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${
      ensureAdjustYToBeAtMostAtTheTopEdgeOfScrollableContainer(
        y,
        scrollableContainer
      ) - dialogElementRect.height
    }px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      x,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getTopPositionStyle({
  dialogElement,
  relativeElement,
  scrollableContainer,
}: {
  dialogElement: HTMLElement;
  relativeElement: HTMLElement;
  scrollableContainer?: HTMLElement;
}) {
  const { x, y, width } = relativeElement.getBoundingClientRect();
  const dialogElementRect = dialogElement.getBoundingClientRect();

  return {
    top: `${
      ensureAdjustYToBeAtMostAtTheTopEdgeOfScrollableContainer(
        y,
        scrollableContainer
      ) - dialogElementRect.height
    }px`,
    left: `${ensureAdjustXToHaveWidthInsideView(
      x + width / 2 - dialogElementRect.width / 2,
      dialogElementRect.width,
      scrollableContainer
    )}px`,
    right: 'auto',
    bottom: 'auto',
  } as const;
}

export function getDialogPositionStyle(
  availablePosition:
    | {
        type: 'full-size-available';
        placement: Placement;
      }
    | {
        placement: Placement;
        availableSize: number;
        type: 'partial-size-available';
      },
  dialogElement: HTMLElement,
  relativeElement: HTMLElement,
  scrollableContainer?: HTMLElement
) {
  switch (availablePosition.placement) {
    case 'top-start':
      return getTopStartPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'top':
      return getTopPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'top-end':
      return getTopEndPositionStyle({
        relativeElement,
        dialogElement,
        scrollableContainer,
      });
    case 'bottom-start':
      return getBottomStartPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'bottom':
      return getBottomPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'bottom-end':
      return getBottomEndPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });
    case 'left-start':
      return getLeftStartPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'left':
      return getLeftPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'left-end':
      return getLeftEndPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });
    case 'right-start':
      return getRightStartPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'right':
      return getRightPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });

    case 'right-end':
      return getRightEndPositionStyle({
        dialogElement,
        relativeElement,
        scrollableContainer,
      });
  }
}
