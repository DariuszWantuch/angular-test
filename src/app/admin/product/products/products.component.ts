import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'price', 'catalog'];
  refreshRequired: Subscription | undefined;
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modal: NgbModal, private productService: ProductService) {
    this.refreshRequired = this.productService.RefreshRequired.subscribe(
      (response) => {
        this.loadProducts();
      }
    );
  }

  ngOnInit(): void {
    this.productService.RefreshRequired.next();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.dataSource = new MatTableDataSource<Product>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  addModal() {
    const modalRef = this.modal.open(AddProductComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }
}
