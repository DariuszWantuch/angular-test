import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from './../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public api: string = environment.apiAddress + '/Product';
  private _refreshRequired = new Subject<void>();

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get RefreshRequired() {
    return this._refreshRequired;
  }

  addProduct(catalog: Product) {
    return this.http.post<Product>(this.api, catalog, this.httpOptions).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, this.httpOptions);
  }
}
