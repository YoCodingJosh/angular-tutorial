import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {
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
