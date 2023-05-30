import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListaCompras } from '../models/lista-compras.model';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Firestore, collection, addDoc, collectionData,
  doc, deleteDoc, updateDoc,
  limit, orderBy, query, startAfter } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListaComprasService {

    // --------Propiedades--------
    ApiFirebase = 'https://shopping-list-c69d4-default-rtdb.firebaseio.com';

    // --------CONSTRUCTOR--------
    constructor(
      private http: HttpClient
    ) { }

    // --------METODOS--------

    create(listacompras: ListaCompras): Observable<ListaCompras> {
      return this.http.post<ListaCompras>(`${this.ApiFirebase}/lista_compras.json`,listacompras
        );
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


}
