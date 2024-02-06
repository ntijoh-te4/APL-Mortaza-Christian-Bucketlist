import { TItem } from "./item";

export type TList = {
  id: number;
  name: string;
  items: TItem[] | null;
};
