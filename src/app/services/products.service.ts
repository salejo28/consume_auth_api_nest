import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly api = 'http://localhost:3000'
  products!: Product[];
  productSelected: Product;
  lengthProducts!: number;

  constructor(private http: HttpClient) { 
    this.productSelected = new Product();
  }

  getProducts() {
    return this.http.get<Product[]>(this.api + '/products');
  }

  createProduct(product: Product) {
    return this.http.post(this.api + '/products/almacen', product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.api + '/products/' + id);
  }

  editProduct(product: Product) {
    return this.http.put(this.api + '/products/' + product.id, product);
  }

}
