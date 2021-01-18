import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { SvelteComponentDev } from 'svelte/internal';

@Component({
  selector: 'app-svelte',
  templateUrl: './svelte.component.html',
  styleUrls: ['./svelte.component.scss'],
})
export class SvelteComponent implements OnInit, OnDestroy, OnChanges {
  @Input() component: typeof SvelteComponentDev;
  @Input() props: object = {};
  instance: SvelteComponentDev;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {
    (window as any).sc = this;
  }

  ngOnInit() {
    const el: HTMLElement = this.elRef.nativeElement;
    const newElem: HTMLDivElement = this.renderer.createElement('div');
    el.appendChild(newElem);
    this.instance = new this.component({ target: newElem, props: this.props });
  }

  on(eventName: string, callback: (event: CustomEvent) => void) {
    this.instance.$on(eventName, callback);
  }

  ngOnChanges() {
    if (this.instance) {
      this.instance.$set(this.props);
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.$destroy();
    }
  }
}
