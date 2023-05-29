import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, updateProductDTO, createProductDTO } from '../models/product.model';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // --------Propiedades--------
  ApiFirebase = 'https://shopping-list-c69d4-default-rtdb.firebaseio.com';

  // --------CONSTRUCTOR--------
  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  // --------METODOS Firebase API - Realtime database--------
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

  // --------MÉTODOS FIRESTORE--------
  createFirestore(product: createProductDTO | Product) {
    const productRef = collection(this.firestore, 'productos');
    return addDoc(productRef, product);
  }
  getFirestore(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'productos');
    return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
  }
  deleteFirestore(product: Product) {
    const productRef = doc(this.firestore, `productos/${product.id}`);
    return deleteDoc(productRef);
  }
  updateFirestore(id: string, dto: updateProductDTO) {
    const productRef = doc(this.firestore, `productos/${id}`);
    return updateDoc(productRef, dto);
  }
  getPageFirestore(offset: string, limitN: number) {
    // obtener productos con la paginación usando offset y limit
    const productRef = collection(this.firestore, 'productos');
    //return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
    return collectionData(
      query(productRef, orderBy('id'), limit(limitN), startAfter(offset))
    ) as Observable<Product[]>;
  }
}
