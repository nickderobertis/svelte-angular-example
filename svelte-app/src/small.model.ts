import type { ISvelteComponent } from "./ext.svelte.interface";

export interface ISmall {
  myVar: number;
  extraContent?: string;
}

export class SmallModel implements ISmall {
  myVar: number;
  extraContent?: string = "<code>some html<code>";
  numClicks?: number;

  constructor(args: ISmall) {
    this.myVar = args.myVar;
    if (args.extraContent) {
      this.extraContent = args.extraContent;
    }
  }
}

export interface ISmallComponent extends ISvelteComponent {
  props?: { model: SmallModel };
}

export interface SmallEventData {
  numClicks: number;
}

export interface SmallEvent extends CustomEvent {
  detail: SmallEventData;
}
