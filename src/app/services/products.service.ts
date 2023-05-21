import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, updateProductDTO, createProductDTO } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // --------Propiedades--------
  ApiFirebase = 'https://shopping-list-c69d4-default-rtdb.firebaseio.com';

  // --------CONSTRUCTOR--------
  constructor(
    private http: HttpClient
  ) { }

  // --------METODOS--------
  getProducts() {
    return this.http.get<Product[]>(`${this.ApiFirebase}/productos.json`);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.ApiFirebase}/productos/${id}.json`);
  }
  create(product: createProductDTO | Product) {
    // add product with a post request with incremental
    return this.http.post<Product>(this.ApiFirebase, product);
  }
  delete(product: Product) {
    return this.http.delete<Product>(`${this.ApiFirebase}/productos/${product.id}${'.json'}`);
  }
  update(id: string, dto: updateProductDTO){
    return this.http.put<Product>(`${this.ApiFirebase}/productos/${id}${'.json'}`, dto);
  }
}
