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
  @Input() listenEvents: string[] = [];
  @Output() woo = new EventEmitter();
  instance: SvelteComponentDev;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {
    (window as any).sc = this;
  }

  ngOnInit() {
    const el: HTMLElement = this.elRef.nativeElement;
    const newElem: HTMLDivElement = this.renderer.createElement('div');
    el.appendChild(newElem);
    this.instance = new this.component({ target: newElem, props: this.props });
    this._registerOutputs();
  }

  _registerOutputs() {
    for (const eventName of this.listenEvents) {
      (this as any)[eventName] = new EventEmitter();
      Output()(this, eventName);

      console.log('event emitter', (this as any)[eventName]);
      console.log('event emitter', new EventEmitter());
      console.log('woo', this.woo);

      this.instance.$on(eventName, (event: CustomEvent) => {
        console.log('fired', eventName);
        (this as any)[eventName].emit(event.detail);
      });
    }
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
