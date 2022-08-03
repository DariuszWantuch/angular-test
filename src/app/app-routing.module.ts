import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HomeComponent } from './shared/layout/home/home.component';
import { ProductsComponent } from './admin/product/products/products.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { CatalogsComponent } from './admin/catalog/catalogs/catalogs.component';
import { AddCatalogComponent } from './admin/catalog/add-catalog/add-catalog.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'catalogs',
    component: CatalogsComponent,
  },
  {
    path: 'add-catalog',
    component: AddCatalogComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
