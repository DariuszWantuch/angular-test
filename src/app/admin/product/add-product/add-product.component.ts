import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { Catalog } from 'src/app/shared/models/catalog.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  FormData!: FormGroup;
  product: Product = {};
  catalogs: Catalog[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private builder: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService
  ) {
    this.FormData = this.builder.group({
      productName: new FormControl(''),
      productCode: new FormControl(''),
      productPrice: new FormControl(''),
      productCatalogId: new FormControl(null),
    });
  }
  ngOnInit(): void {
    this.catalogService.getCatalogs().subscribe((res: Catalog[]) => {
      this.catalogs = res;
    });
  }

  onSubmit() {
    this.product.name = this.FormData.controls['productName'].value;
    this.product.code = this.FormData.controls['productCode'].value;
    this.product.price = this.FormData.controls['productPrice'].value;
    this.product.catalogId = this.FormData.controls['productCatalogId'].value;
    console.log(this.product);
    this.productService
      .addProduct(this.product)
      .subscribe(() => this.activeModal.close());
  }
}
