import { Injectable } from '@angular/core';
import { Product } from '../models/product.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //store service se encarga de la manipulacion de la lista de productos

  // --------- PROPIEDADES ---------
  cart: Product[] = [];
  total = 0;
  cartBehavior = new BehaviorSubject<Product[]>([]); // es un estado
  cartBehavior$ = this.cartBehavior.asObservable();

  // --------- CONSTRUCTOR ---------
  constructor() { }


  // --------- METODOS ---------
  addToCart(product: Product) {
    //console.log('product', product);
    this.cart.push(product);
    this.cartBehavior.next(this.cart); //notificar a los subscriptores
  }
  getCart(){
    return this.cart;
  }
  getTotal(){
    this.total = 0;
    this.cart.forEach(product => {
      this.total = this.total + product.price;
    });
    return this.total;
  }
}
