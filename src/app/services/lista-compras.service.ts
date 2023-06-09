import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListaCompras, createListaComprasDTO, updateListaComprasDTO } from '../models/lista-compras.model';
import { Observable } from 'rxjs';
import { Product, createProductDTO, updateProductDTO } from '../models/product.model';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc, getDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListaComprasService {

  // --------Propiedades--------
  ApiFirebase = 'https://shopping-list-c69d4-default-rtdb.firebaseio.com';
  id_lista_compras: string|undefined = "";

  // --------CONSTRUCTOR--------
  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  // --------METODOS--------

  setIdListaCompras(id: string|undefined){
    this.id_lista_compras = id;
  }

  getIdListaCompras(){
    return this.id_lista_compras;
  }

  create(listacompras: ListaCompras): Observable<ListaCompras> {
    return this.http.post<ListaCompras>(`${this.ApiFirebase}/lista_compras.json`,listacompras);
  }

  listarCompras(){
    return this.http.get<any>(`${this.ApiFirebase}/lista_compras.json`);
  }

  delete(id: String){
    return this.http.delete<boolean>(`${this.ApiFirebase}/lista_compras/${id}${'.json'}`);
  }

  getById(id: String){
    return this.http.get<ListaCompras>(`${this.ApiFirebase}/lista_compras/${id}${'.json'}`);
  }

  update(id: String, listacompras: ListaCompras){
    return this.http.put<any>(`${this.ApiFirebase}/lista_compras/${id}${'.json'}`, listacompras);
  }

  // --------MÉTODOS FIRESTORE--------
  createFirestore(lista: ListaCompras) {
    const listaRef = collection(this.firestore, 'lista_compras');
    return addDoc(listaRef, lista);
  }
  getFirestore(): Observable<ListaCompras[]> {
    const listaRef = collection(this.firestore, 'lista_compras');
    return collectionData(listaRef, { idField: 'id' }) as Observable<ListaCompras[]>;
  }
  getFirestoreById(id:string|number) {
    const listaRef = doc(this.firestore, `lista_compras/${id}`);
    return getDoc(listaRef);
  }
  deleteFirestore(lista: ListaCompras) {
    const listaRef = doc(this.firestore, `lista_compras/${lista.id}`);
    return deleteDoc(listaRef);
  }
  updateFirestore(id: string|number, dto: updateListaComprasDTO) {
    const listaRef = doc(this.firestore, `lista_compras/${id}`);
    return updateDoc(listaRef, dto);
  }
  getPageFirestore(offset: string, limitN: number) {
    // obtener lista_compras con la paginación usando offset y limit
    const listaRef = collection(this.firestore, 'lista_compras');
    //return collectionData(listaRef, { idField: 'id' }) as Observable<Product[]>;
    return collectionData(
      query(listaRef, orderBy('id'), limit(limitN), startAfter(offset)),  { idField: 'id' }
    ) as Observable<ListaCompras[]>;
  }

}
