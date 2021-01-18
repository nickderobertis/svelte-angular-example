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
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-app';
  svelteApp: SvelteComponentDev;
  inpValue: number = 100;
  appClicks: number = 0;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    const el: HTMLElement = this.elRef.nativeElement;
    const newElem: HTMLDivElement = this.renderer.createElement('div');
    newElem.id = 'svelte';
    el.appendChild(newElem);
    const componentData: ISmallComponent = {
      target: newElem,
      props: {
        model: this.smallModel,
      },
    };
    this.svelteApp = new Small(componentData);
    this.svelteApp.$on('smallEvent', (event: CustomEvent) => {
      this.onSmallEvent(event);
    });
  }

  get smallModel(): SmallModel {
    return new SmallModel({
      myVar: this.inpValue,
      extraContent: '<p>angular + svelte rocks<p>',
    });
  }

  onFormChange(value: number) {
    this.svelteApp.$set({
      model: this.smallModel,
    });
  }

  onSmallEvent(event: CustomEvent) {
    this.appClicks = event.detail.numClicks;
  }

  ngOnDestroy() {
    this.svelteApp.$destroy();
  }
}
