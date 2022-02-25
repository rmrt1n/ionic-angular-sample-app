import { Item } from './item'

export interface Shoplist {
  id: number;
  name: string;
  items: Item[];
}
