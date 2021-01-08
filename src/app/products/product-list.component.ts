import { Component, OnInit } from "@angular/core";

import productData from "src/api/products/products.json";

import { IProduct } from "./product";

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
  products: IProduct[] = productData;
  imageWidth: number = 80;
  imageMargin: number = 2;
  showingImage: boolean = false;
  listFilter: string = "";

  ngOnInit(): void {
    console.log("Konnichiwa!")
  }

  getProducts(): any[] {
    return this.products;
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
}
