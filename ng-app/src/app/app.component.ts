import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SvelteComponentDev } from 'svelte/internal';
import Small from '../../../svelte-app/build/dist/Small.svelte';
import {
  ISmallComponent,
  SmallModel,
} from '../../../svelte-app/src/small.model';
import { SvelteComponent } from './svelte/svelte.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-app';
  smallClass: typeof SvelteComponentDev = Small;
  model: SmallModel = new SmallModel({
    myVar: 100,
    extraContent: '<p>angular + svelte rocks<p>',
  });
  appClicks: number = 0;
  @ViewChild(SvelteComponent) smallRef: SvelteComponent;

  constructor() {}

  ngAfterViewInit() {
    this.smallRef.on('smallEvent', (event: CustomEvent) => {
      this.onSmallEvent(event);
    });
  }

  onFormChange(value: number) {
    this.model = new SmallModel({
      myVar: this.model.myVar,
      extraContent: '<p>angular + svelte rocks<p>',
    });
  }

  onSmallEvent(event: CustomEvent) {
    this.appClicks = event.detail.numClicks;
  }
}
