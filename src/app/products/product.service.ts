import { Injectable } from '@angular/core';

import { IProduct } from './product';

import productData from "src/api/products/products.json";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products: IProduct[] = productData;

  getProducts(): IProduct[] {
    return this._products;
  }
}
