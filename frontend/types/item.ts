export type TItem = {
  id: number;
  description: string;
  isComplete: boolean;
  isVisible: boolean;
};
export type TItemTemplate = TItem & {
  isVisible?: boolean;
};
