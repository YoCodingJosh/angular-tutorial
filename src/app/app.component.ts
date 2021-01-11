import { Component } from "@angular/core";
import { ProductService } from './products/product.service';

@Component({
  selector: "pm-root",
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarContent" aria-controls="myNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand">{{pageTitle}}</a>
    <div class="collapse navbar-collapse" id="myNavbarContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"><a class="nav-link" [routerLink]="['/welcome']" routerLinkActive="active">Home</a></li>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/products']" routerLinkActive="active">Product List</a></li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <select class="form-control mr-sm-2" name="currencyDropdown" [(ngModel)]="productService.currentCurrency" (change)="productService.updateCurrencySymbol()">
          <option value="USD">USD $</option>
          <option value="JPY">JPY &yen;</option>
        </select>
      </form>
    </div>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = "Josh's Product Management";
  productService: ProductService;

  constructor(_productService: ProductService) {
    this.productService = _productService;
  }
}
