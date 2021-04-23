import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['index', 'title', 'description', 'actions']

  constructor(
    public productService: ProductsService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
    });
  }

  getProduct() {
    this.productService.getProducts()
      .subscribe(
        res => {
          console.log(res)
          this.productService.products = res as Product[];
          this.productService.lengthProducts = this.productService.products.length + 1;
        },
        err => {
          console.log(err)
        }
      );
  }

  addProduct(form: NgForm) {
    if (form.value.id) {
      console.log(form.value.id)
      this.productService.editProduct(form.value)
        .subscribe((res: any) => {
          console.log(res)
          this.resetForm(form);
          this.openSnackBar("Updated successfully")
          this.getProduct();
        })
    } else {
      this.productService.createProduct(form.value)
        .subscribe(
          res => {
            this.resetForm(form);
            this.getProduct();
          }
        );
    }
  }

  deleteProduct(id: string) {
    if (confirm("Are you sure to delete this?")) {
      this.productService.deleteProduct(id)
        .subscribe((res: any) => {
          this.openSnackBar(res.message[0])
          this.getProduct();
        })
    }
  }

  putProduct(product: Product) {
    this.productService.productSelected = product;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productService.productSelected = new Product();
    }
  }

}
