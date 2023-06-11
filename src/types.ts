export interface SwiperActionProps {
  children: React.ReactNode;
  actions: React.ReactElement<ActionProps>;
}

export interface ActionProps {
  children: React.ReactNode;
  action: (ev: InteractionEvent) => any;
}

export type InteractionEvent =
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>;
