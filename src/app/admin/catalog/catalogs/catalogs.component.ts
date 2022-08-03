import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { AddCatalogComponent } from '../add-catalog/add-catalog.component';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css'],
})
export class CatalogsComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  refreshRequired: Subscription | undefined;
  dataSource = new MatTableDataSource<Catalog>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modal: NgbModal, private catalogService: CatalogService) {
    this.refreshRequired = this.catalogService.RefreshRequired.subscribe(
      (response) => {
        this.loadCatalogs();
      }
    );
  }

  ngOnInit(): void {
    this.catalogService.RefreshRequired.next();
  }

  loadCatalogs() {
    this.catalogService.getCatalogs().subscribe((res: Catalog[]) => {
      this.dataSource = new MatTableDataSource<Catalog>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  addModal() {
    const modalRef = this.modal.open(AddCatalogComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }
}
