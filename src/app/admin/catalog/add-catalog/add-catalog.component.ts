import { Catalog } from './../../../shared/models/catalog.model';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css'],
})
export class AddCatalogComponent implements OnInit {
  FormData!: FormGroup;
  catalog: Catalog = { name: '' };

  constructor(
    public activeModal: NgbActiveModal,
    private builder: FormBuilder,
    private catalogService: CatalogService
  ) {
    this.FormData = this.builder.group({
      catalogName: new FormControl(''),
    });
  }

  onSubmit() {
    this.catalog.name = this.FormData.controls['catalogName'].value;
    console.log(this.catalog);
    this.catalogService
      .addCatalog(this.catalog)
      .subscribe(() => this.activeModal.close());
  }

  ngOnInit(): void {}
}
