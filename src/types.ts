export interface SwiperActionProps {
  children: React.ReactNode;
  actions: React.ReactElement<ActionProps>;
}

export interface ActionProps {
  children: React.ReactNode;
  action: (ev: React.MouseEvent<Element, MouseEvent>) => any;
}
