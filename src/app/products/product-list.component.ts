import { Component, OnInit } from "@angular/core";

import { IProduct } from "./product";

import { ProductService } from './product.service';

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: [
    './product-list.component.css'
  ]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  currency: string = "USD";
  currencySymbol: string = "$";
  imageWidth: number = 80;
  imageMargin: number = 2;
  showingImage: boolean = false;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string;
  
  private _listFilter: string = "";

  productService: ProductService;

  constructor(_productService: ProductService) {
    this.productService = _productService;
  }

  ngOnInit(): void {
    console.log("Konnichiwa!");

    this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err,
      complete: () => this.filteredProducts = this.products
    });

    this.filteredProducts = this.products;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;

    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  toggleImage(): void {
    this.showingImage = !this.showingImage;
  }

  performFilter(filterString: string): IProduct[] {
    filterString = filterString.toLocaleLowerCase();

    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterString) !== -1);
  }

  onRatingClicked(value: string): void {
    // this.pageTitle = value;
  }
}
