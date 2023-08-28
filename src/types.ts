export interface SwiperActionProps {
  children: React.ReactNode;
  actions: ActionData[];
  onSwipeStart?: (ev: InteractionEvent) => any;
  onSwipeEnd?: (ev: InteractionEvent) => any;
  onSwipe?: (ev: InteractionEvent) => any;
}

export interface ActionProps {
  children: React.ReactNode;
  action: (ev: InteractionEvent, args: any | null) => any;
  args: any | null;
}

export type InteractionEvent =
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>;

export interface ActionData {
  children: React.ReactNode;
  action: (ev: InteractionEvent, args: any | null) => any;
  args?: any;
}
