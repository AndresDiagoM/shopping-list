import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, updateProductDTO, createProductDTO } from '../models/product.model';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc, getDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // --------Propiedades--------
  product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    images: [],
    category: {
      id: '',
      name: ''
    },
    description: ''
  };


  // --------CONSTRUCTOR--------
  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }


  // --------MÉTODOS FIRESTORE--------
  createFirestore(product: createProductDTO | Product) {
    const productRef = collection(this.firestore, 'productos');
    return addDoc(productRef, product);
  }
  getFirestore(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'productos');
    return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
  }
  async getFirestoreById(id:string) {
    if(id === '') return this.product;
    const productRef = doc(this.firestore, 'productos',  id);
    //return await getDoc(productRef);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      //console.log('Document data:', productSnap.data(), productSnap.id);
      // replace the document id with the snapshot id
      this.product = productSnap.data() as Product;
      this.product.id = productSnap.id;
      //console.log('this.product.id: ', this.product.id);
      return this.product as Product;
    }
    return this.product;
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
      query(productRef, orderBy('id'), limit(limitN), startAfter(offset)),  { idField: 'id' }
    ) as Observable<Product[]>;
  }
}
