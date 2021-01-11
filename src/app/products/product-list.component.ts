import { Component, OnInit } from "@angular/core";

import { IProduct } from "./product";

import { ProductService } from './product.service';

@Component({
  selector: "pm-products",
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

  constructor(private productService: ProductService) {
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

  getCurrencyDisplayString(): string {
    return `${this.currency} ${this.currencySymbol}`;
  }

  onCurrencyChange(): void {
    switch (this.currency) {
      case "USD":
        this.currencySymbol = "$";
        break;
      case "JPY":
        this.currencySymbol = `&yen;`;
    }
  }

  getCurrencyAmount(productPrice: number): number {
    switch (this.currency) {
      case "USD":
        // since we're already in USD
        return productPrice;
      case "JPY":
        // thankfully the japanese yen is kinda related to USD (1 JPY = ~0.01 USD)
        return Math.ceil(productPrice) * 100;
    }
  }

  performFilter(filterString: string): IProduct[] {
    filterString = filterString.toLocaleLowerCase();

    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterString) !== -1);
  }

  onRatingClicked(value: string): void {
    this.pageTitle = value;
  }
}
