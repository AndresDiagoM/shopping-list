import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ListaProductos } from '../models/lista-producto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc, getDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //store service se encarga de la manipulacion de la lista de productos

  // --------- PROPIEDADES ---------
  cart: Product[] = [];
  listaproductos: ListaProductos[] = [];
  total = 0;
  cartBehavior = new BehaviorSubject<Product[]>([]); // es un estado
  cartBehavior$ = this.cartBehavior.asObservable();

  // --------- CONSTRUCTOR ---------
  constructor(
    private firestore: Firestore
  ) { }


  // --------- METODOS ---------
  addToCart(product: Product) {
    //console.log('product', product);
    this.cart.push(product);
    this.cartBehavior.next(this.cart); //notificar a los subscriptores
  }
  // OBTENER TODOS LOS PRODUCTOS
  getCart(): Observable<ListaProductos[]> {
    const listaRef = collection(this.firestore, 'lista_producto');
    return collectionData(listaRef, { idField: 'id' }) as Observable<ListaProductos[]>;
    //  return this.cart;
  }
  getTotal(){
    this.total = 0;
    this.cart.forEach(product => {
      this.total = this.total + product.price;
    });
    return this.total;
  }
  quitarProducto(product: Product) {
    const index = this.cart.findIndex((prod) => prod.id === product.id);
    this.cart.splice(index, 1);
    this.cartBehavior.next(this.cart);
  }
}
