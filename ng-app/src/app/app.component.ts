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
  }
}
