export type TBackendItem = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Deadline?: Date;
  isComplete: boolean;
};
