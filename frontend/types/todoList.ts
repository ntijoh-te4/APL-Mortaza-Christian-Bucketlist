import { TTodoItem } from "./todoItem";

export type TTodoList = {
  id: number;
  name: string;
  items: TTodoItem[] | null;
};

export type TTodoListPreviewResponse = {
  id: number;
  name: string;
};
