import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import Small from '../../../svelte-app/build/dist/Small.svelte';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-app';
  svelteApp: Small;
  inpValue: number = 100;
  appClicks: number = 0;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    const el: HTMLElement = this.elRef.nativeElement;
    const newElem: HTMLDivElement = this.renderer.createElement('div');
    newElem.id = 'svelte';
    el.appendChild(newElem);
    this.svelteApp = new Small({
      target: newElem,
      props: {
        myVar: this.inpValue,
      },
    });
    this.svelteApp.$on('smallEvent', (event: CustomEvent) => {
      this.onSmallEvent(event);
    });
  }

  onFormChange(value: number) {
    this.svelteApp.$set({ myVar: value });
  }

  onSmallEvent(event: CustomEvent) {
    this.appClicks = event.detail.numClicks;
  }
}
