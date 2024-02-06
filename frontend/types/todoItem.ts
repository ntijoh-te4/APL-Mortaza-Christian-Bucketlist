export type TTodoItem = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  isComplete: boolean;
  isVisible: boolean;
};

export type TTodoItemResponse = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  isComplete: boolean;
};
