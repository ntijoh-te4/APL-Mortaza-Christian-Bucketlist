export type TItem = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Deadline?: Date;
  isComplete: boolean;
  isVisible: boolean;
};
export type TItemTemplate = TItem & {
  isVisible?: boolean;
};
