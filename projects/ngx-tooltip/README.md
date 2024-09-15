# Controllable UI - Angular Library ⚡️

# Tooltip

**Customizable tooltip** component with **advanced placement strategies** for positioning. It ensures the tooltip is **positioned optimally within available screen space**, **automatically adjusting** based on user-defined preferences and space constraints.

## Features

- **HTML content support**: Supports HTML content, allowing for richer and more flexible tooltip messages.
- **Customizable style & animations**: Supports customizable styles and animations by exposing CSS classes for different parts of the tooltip.
- **Dynamic Placement**: Automatically adjusts the tooltip placement based on available space.
- **Customizable Fallback Placements**: Define the order of fallback placements to try if the preferred placement lacks space.
- **Multiple Trigger Actions**: Open tooltips using hover, focus, or click events.
- **Arrow pointer**: Offers an optional arrow that automatically adjusts its position to point to the target element.
- **Timeout Configuration**: Configure open and close timeouts for tooltip behavior.
- **Flexible Positioning Strategies**: Choose between two strategies:
  - immediately reposition the tooltip when space is limited
  - keep the current placement as long as it fits within the min/max tooltip sizes.

## Installation

```bash
npm install @controllable-ui-angular/ngx-tooltip
```

Include the `NgxTooltipComponent` component in your project by adding it in the imports array.

```ts
import { Tooltip } from "./Tooltip";
```

Ensure you have the necessary dependencies and the environment set up for compiling and running the component.

## Usage

### Create the Basic Tooltip Component with desired behavior

```html
<app-ngx-tooltip [arrow]="arrow()" [triggerActions]="triggerActions()" [tooltipRootClass]="tooltipRootClass()" [scrollableContainer]="scrollableContainer()" [open]="dialogIsOpen()" [enterDelay]="enterDelay()" [leaveDelay]="leaveDelay()" [preferredPlacement]="preferredPlacement()" [placementStrategy]="placementStrategy()" [dialogMinMaxSizes]="dialogMinMaxSizes()" [dialogOffset]="dialogOffset()" (onOpen$)="handleOpen$()" (onClose$)="handleClose$()">
  <span class="relative-element">
    <ng-content select=".relative-element" />
  </span>
  <span class="message">
    <ng-content select=".message" />
  </span>
</app-ngx-tooltip>
```

```ts
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, input, signal, ViewEncapsulation } from "@angular/core";

import { NgxTooltipComponent } from "@controllable-ui/ngx-tooltip.component";
import { Placement } from "../../components/tooltip/types";

@Component({
  selector: "app-basic-tooltip",
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  templateUrl: "./basic-tooltip.component.html",
  styleUrl: "./basic-tooltip.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BasicTooltipComponent {
  arrow = input<boolean>(false);
  triggerActions = input<("hover" | "focus" | "click")[]>(["click"]);
  tooltipRootClass = input<string>();
  preferredPlacement = input<Placement>("bottom");
  placementStrategy = input<"default" | "considerKeepingCurrentPlacement">("default");
  dialogOffset = input<number>(10);

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
```

### How to use the created `BasicTooltipComponent` 🎉

```html
<app-basic-tooltip [scrollableContainer]="scrollableContainerElement()">
  <button class="relative-element">Default - interactive</button>
  <span class="message"> Hover this tooltip and select its content </span>
</app-basic-tooltip>
```

```ts
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, BasicTooltipComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  scrollableContainerElement = viewChild<ElementRef>("scrollableContainer");
}
```

### Props

#### `BaseProps`

| Prop                         | Type                                | Description                                                                                                                                                                            |
| ---------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`                       | `InputSignal<boolean \| undefined>` | Input signal that controls whether the tooltip is open or closed.                                                                                                                      |
| `onOpen$`                    | `QRL<() => void>`                   | Optional callback when the tooltip opens.                                                                                                                                              |
| `onClose$`                   | `QRL<() => void>`                   | Optional callback when the tooltip closes.                                                                                                                                             |
| `preferredPlacement`         | `Placement`                         | The preferred placement of the tooltip (`bottom-end`, `bottom-start`, `bottom`, `left-end`, `left-start`, `left`, `right-end`, `right-start`, `right`, `top-end`, `top-start`, `top`). |
| `orderOfPlacementsToBeTried` | `[Placement, ...Placement[]]`       | The list of placements to try if the preferred one lacks space.                                                                                                                        |
| `triggerActions`             | `("hover", "focus", "click")[]`     | Defines how the tooltip should be triggered (hover, focus, or click).                                                                                                                  |
| `dialogOffset`               | `number`                            | Distance between the tooltip and the triggering element.                                                                                                                               |
| `enterDelay`                 | `number`                            | The number of milliseconds to wait before showing the tooltip.                                                                                                                         |
| `leaveDelay`                 | `number`                            | The number of milliseconds to wait before hiding the tooltip.                                                                                                                          |
| `arrow`                      | `boolean`                           | If `true`, renders an arrow on the tooltip.                                                                                                                                            |
| `scrollableContainer`        | `HTMLElement`                       | Scrollable container is the one used to track scroll event and position dialog while scrolling inside it.                                                                              |
| `tooltipClass`               | `string`                            | Additional class for tooltip dialog.                                                                                                                                                   |
| `tooltipRootClass`           | `string`                            | Additional class for tooltip root element (element containing the dialog plus the space between it and relative element).                                                              |

#### `DefaultStrategyProps`

In this strategy, the tooltip is repositioned immediately if the current placement no longer has enough space.

```ts
placementStrategy: "default";
```

#### `KeepCurrentPlacementStrategyProps`

Keep current placement of dialog as time as it remains in min & max sizes boundaries.

```ts
/* Strategy to keep the current placement as long as space allows. */
placementStrategy: "considerKeepingCurrentPlacement";
/* Dialog size constraints. */
dialogMinMaxSizes?: {
  dialogMaxHeight?: number;
  dialogMinHeight?: number;
  dialogMaxWidth?: number;
  dialogMinWidth?: number;
};
```

`dialogMinMaxSizes`:

In case we need to keep current position, we will use maximum & minimum sizes
of dialog to check if it fits in current placement, without going over its minimum sizes.
In case we don't have minimum size available for current placement,
than will be tried next place from `orderOfPlacementsToBeTried`.

Maximum size is used to make sure to not have a bigger maximum size on dialog popover.

> 📝Note: we make sure to override the maximum size in case the available space is smaller than the dialog size).

## Placement Strategies

You can choose between two different strategies for tooltip placement:

1. **Default Strategy** (`placementStrategy: "default"`)

   - The dialog placement will be recalculated immediately if there is insufficient space in the current position.

2. **Consider Keeping Current Placement Strategy** (`placementStrategy: "considerKeepingCurrentPlacement"`)
   - Attempts to keep the tooltip in its current position as long as it fits within the provided minimum and maximum size constraints. If space becomes too tight, it switches to the next placement in the list.

## Order of Placements

The `defaultOrderOfPlacementsToBeTried` object provides fallback placement orders for various initial placements. For example:

```ts
export const defaultOrderOfPlacementsToBeTried = {
  "top-start": ["top-start", "bottom-start", "left", "right"],
  top: ["top", "bottom", "left", "right"],
  // Additional placement configurations
};
```

This means if the preferred placement is `top-start`, the system will try `bottom-start`, `left`, and `right` if there isn’t enough space.

### CSS Classes

These class names are useful for styling with CSS. They are applied to the component's slots when specific states are triggered.

#### Class Names

| **Class Name**                                  | **Description**                                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.ngxTooltip-arrow`                             | Styles applied to the arrow element of the tooltip.                                           |
| `.ngxTooltip-dialog-with-bridge`                | Styles applied to the tooltip dialog container.                                               |
| `.ngxTooltip-inner-dialog-with-bridge`          | Styles applied to the inner container of the tooltip dialog.                                  |
| `.ngxTooltip-animated-inner-dialog-with-bridge` | Styles applied to the animated container of the tooltip dialog.                               |
| `.ngxTooltip-tooltip`                           | Styles applied to the tooltip's content box.                                                  |
| `.ngxTooltip-placement-top-start`               | Styles applied to the tooltip's content box when the placement is "top-start".                |
| `.ngxTooltip-placement-top`                     | Styles applied to the tooltip's content box when the placement is "top".                      |
| `.ngxTooltip-placement-top-end`                 | Styles applied to the tooltip's content box when the placement is "top-end".                  |
| `.ngxTooltip-placement-bottom-start`            | Styles applied to the tooltip's content box when the placement is "bottom-start".             |
| `.ngxTooltip-placement-bottom`                  | Styles applied to the tooltip's content box when the placement is "bottom".                   |
| `.ngxTooltip-placement-bottom-end`              | Styles applied to the tooltip's content box when the placement is "bottom-end".               |
| `.ngxTooltip-placement-left-start`              | Styles applied to the tooltip's content box when the placement is "left-start".               |
| `.ngxTooltip-placement-left`                    | Styles applied to the tooltip's content box when the placement is "left".                     |
| `.ngxTooltip-placement-left-end`                | Styles applied to the tooltip's content box when the placement is "left-end".                 |
| `.ngxTooltip-placement-right-start`             | Styles applied to the tooltip's content box when the placement is "right-start".              |
| `.ngxTooltip-placement-right`                   | Styles applied to the tooltip's content box when the placement is "right".                    |
| `.ngxTooltip-placement-right-end`               | Styles applied to the tooltip's content box when the placement is "right-end".                |
| `.ngxTooltip-show`                              | Styles applied to the tooltip when it is visible, triggering the `ngxTooltip-show` animation. |
| `.ngxTooltip-hide`                              | Styles applied to the tooltip when it is hidden, triggering the `ngxTooltip-hide` animation.  |
| `.ngxTooltip-relative-element`                  | Styles applied to the relative element that the tooltip is anchored to.                       |

### Animation Classes

- **`.ngxTooltip-show`**

  - **Animation**: Applies the `ngxTooltip-show` keyframes.
  - **Description**: Fades in and scales up the tooltip.

- **`.ngxTooltip-hide`**
  - **Animation**: Applies the `ngxTooltip-hide` keyframes.
  - **Description**: Fades out and scales down the tooltip.

### Keyframes

- **`@keyframes ngxTooltip-show`**

  - **0%**: Opacity 0, transform scale(0.8)
  - **100%**: Opacity 1, transform scale(1)

- **`@keyframes ngxTooltip-hide`**
  - **0%**: Opacity 1, transform scale(1)
  - **100%**: Opacity 0, transform scale(0.8)

### Customization

You can override the style of the component using one of these customization options:

- **With a global class name**: Apply custom styles globally to override the default styles.

  ```css
  .my-amazing-tooltip {
    .ngxTooltip-tooltip {
      background-color: #333;
      color: #fff;
      font-size: 14px;
    }

    .ngxTooltip-arrow {
      color: #333;
    }
  }
  ```

## License

This project is licensed under the MIT License.
