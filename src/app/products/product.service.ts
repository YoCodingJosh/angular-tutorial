import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products/products.json';

  private _currentCurrency: string = "USD";
  private _currentCurrencySymbol: string = "$";

  constructor(private http: HttpClient) {
  }

  get currentCurrency(): string {
    return this._currentCurrency;
  }

  set currentCurrency(value: string) {
    this._currentCurrency = value;
  }

  get currentCurrencySymbol(): string {
    return this._currentCurrencySymbol;
  }

  set currentCurrencySymbol(value: string) {
    this._currentCurrencySymbol = value;
  }

  getCurrencyDisplayString(): string {
    return `${this._currentCurrency} ${this._currentCurrencySymbol}`;
  }

  updateCurrencySymbol(): void {
    switch (this._currentCurrency) {
      case "USD":
        this._currentCurrencySymbol = "$";
        break;
      case "JPY":
        this._currentCurrencySymbol = `&yen;`;
        break;
    }
  }

  getCurrencyAmount(productPrice: number): number {
    switch (this._currentCurrency) {
      case "USD":
        // since we're already in USD
        return productPrice;
      case "JPY":
        // thankfully the japanese yen is kinda related to USD (1 JPY = ~0.01 USD)
        return Math.ceil(productPrice) * 100;
    }
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // TODO: actual error logging lol
    let errorMessage: string = "";

    if (err.error instanceof ErrorEvent) {
      // This is a client-side error (like a network error)
      errorMessage = `An error has occurred: ${err.error.message}`;
    } else {
      // The request itself was successfully sent (no network errors, etc)
      // but the server indicated that the request was process unsuccessfully.
      errorMessage = `The server returned error: ${err.status} with a message of: ${err.message}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
