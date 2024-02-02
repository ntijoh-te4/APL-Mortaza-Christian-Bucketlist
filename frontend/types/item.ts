export type TItem = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  isComplete: boolean;
  isVisible: boolean;
};
