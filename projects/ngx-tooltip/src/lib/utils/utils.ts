import { Signal } from '@angular/core';

export const generateRandomNumber = () => {
  const seed = new Date().getTime(); // Get current timestamp
  const random = Math.abs(Math.sin(seed) * 1000000); // Use sine function for randomness and scale it
  return Math.floor(random); // Return a positive integer
};

export const getDocumentWidth = () => document.documentElement.clientWidth;
export const getDocumentHeight = () => document.documentElement.clientHeight;
export const nextTickRender = () =>
  new Promise((resolve) => setTimeout(resolve));

export const delay = (milliseconds: number, timeoutIDSignal: Signal<number>) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export function getScrollableContainer(scrollableContainer?: HTMLElement) {
  return scrollableContainer ?? document.documentElement;
}
