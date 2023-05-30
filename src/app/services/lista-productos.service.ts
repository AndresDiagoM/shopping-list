import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ListaProductos, createListaProductosDTO, updateListaProductosDTO} from '../models/lista-producto.model';
import { Observable } from 'rxjs';
import { Product, createProductDTO, updateProductDTO } from '../models/product.model';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc, getDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {

  // --------Propiedades--------

  // --------CONSTRUCTOR--------
  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  // --------MÉTODOS FIRESTORE--------
  createFirestore(lista: ListaProductos) {
    const listaRef = collection(this.firestore, 'lista_producto');
    return addDoc(listaRef, lista);
  }
  getFirestore(): Observable<ListaProductos[]> {
    const listaRef = collection(this.firestore, 'lista_producto');
    return collectionData(listaRef, { idField: 'id' }) as Observable<ListaProductos[]>;
  }
  getFirestoreById(id:string|number) {
    const listaRef = doc(this.firestore, `lista_producto/${id}`);
    return getDoc(listaRef);
  }
  deleteFirestore(lista: ListaProductos) {
    const listaRef = doc(this.firestore, `lista_producto/${lista.id}`);
    return deleteDoc(listaRef);
  }
  updateFirestore(id: string|number, dto: updateListaProductosDTO) {
    const listaRef = doc(this.firestore, `lista_producto/${id}`);
    return updateDoc(listaRef, dto);
  }
  getPageFirestore(offset: string, limitN: number) {
    // obtener lista_producto con la paginación usando offset y limit
    const listaRef = collection(this.firestore, 'lista_producto');
    //return collectionData(listaRef, { idField: 'id' }) as Observable<Product[]>;
    return collectionData(
      query(listaRef, orderBy('id'), limit(limitN), startAfter(offset)),  { idField: 'id' }
    ) as Observable<ListaProductos[]>;
  }

}
