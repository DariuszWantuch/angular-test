import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Catalog } from './../models/catalog.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  public api: string = environment.apiAddress + '/Catalog';
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

  addCatalog(catalog: Catalog) {
    return this.http.post<Catalog>(this.api, catalog, this.httpOptions).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  getCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.api, this.httpOptions);
  }
}
