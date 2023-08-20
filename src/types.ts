export interface SwiperActionProps {
  children: React.ReactNode;
  // actions: React.ReactElement<ActionProps>[];
  actionsData: ActionData[];
}

export interface ActionProps {
  children: React.ReactNode;
  action: (ev: InteractionEvent, args: any | null) => any;
  args: any;
}

export type InteractionEvent =
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>;

export interface ActionData {
  children: React.ReactNode;
  action: (ev: InteractionEvent, args: any | null) => any;
  args: any;
}
