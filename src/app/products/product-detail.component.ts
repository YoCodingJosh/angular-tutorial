import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;
  productService: ProductService;

  constructor(private route: ActivatedRoute, _productService: ProductService, private router: Router) {
    this.productService = _productService;
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(id).subscribe({
      next: products => {
        console.log(products);
        this.product = products[0];
      },
      error: err => this.errorMessage = err,
      complete: () => console.log(this.product)
    });
  }

  goBack(): void {
    this.router.navigateByUrl("/products");
  }
}
