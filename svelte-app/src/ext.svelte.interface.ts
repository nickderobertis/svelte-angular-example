declare type Props = Record<string, any>;

export interface ISvelteComponent {
  target: Element;
  anchor?: Element;
  props?: Props;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
}
