import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SvelteComponentDev } from 'svelte/internal';
import Small from '../../../svelte-app/build/dist/Small.svelte';
import {
  ISmallComponent,
  SmallModel,
} from '../../../svelte-app/src/small.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-app';
  smallClass: typeof SvelteComponentDev = Small;
  model: SmallModel = new SmallModel({
    myVar: 100,
    extraContent: '<p>angular + svelte rocks<p>',
  });
  appClicks: number = 0;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {}

  onFormChange(value: number) {
    this.model = new SmallModel({
      myVar: this.model.myVar,
      extraContent: '<p>angular + svelte rocks<p>',
    });
  }

  onSmallEvent(event: CustomEvent) {
    console.log('got event', event);
    this.appClicks = event.detail.numClicks;
  }
}
