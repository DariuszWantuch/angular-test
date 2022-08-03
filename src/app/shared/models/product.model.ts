import { Catalog } from './catalog.model';

export class Product {
  id?: number;
  code?: string;
  name?: string;
  price?: number;
  catalogId?: number;
  catalog?: Catalog;
}
