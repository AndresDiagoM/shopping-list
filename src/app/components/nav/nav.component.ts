import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { UserService } from 'src/app/services/user.service';
import { ListaProductosService } from 'src/app/services/lista-productos.service';
import { ListaComprasService } from 'src/app/services/lista-compras.service';
import { ListaCompras } from 'src/app/models/lista-compras.model';
import { ListaProductos } from 'src/app/models/lista-producto.model';
import { Subscription, switchMap, from, concatMap } from 'rxjs';

import { Auth,onAuthStateChanged, getAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  cart : Product[] = [];
  menuStatus = false;
  counter = 0;
  email: any="";
  listState = false;
  iduser: any="";
  id_lista_compras: string|undefined="";
  private firestoreSubscription: Subscription;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth,
    private listaProductosService: ListaProductosService,
    private listacomprasservice: ListaComprasService
  ) {
    this.storeService.cartBehavior$.subscribe((cart) => {
      this.counter = cart.length;
      this.cart = cart;
      //console.log('[app-nav] cart length', this.cart.length);
    });
    this.firestoreSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.email = this.auth.currentUser!.email;
    this.iduser = this.auth.currentUser!.uid;
    console.log("[app-nav] email:",this.email, ", iduser:", this.iduser);
  }

  ocultarMenu(event: Event) {
    this.menuStatus = !this.menuStatus;
    //console.log(event);
  }

  ocultarLista() {
    this.listState = !this.listState;
  }

  quitarPorducto(product: Product) {
    // Eliminar de la lista de Firestore
    this.id_lista_compras = this.listacomprasservice.getIdListaCompras();
    // consultar lista de productos con el id_lista_compras
    this.listaProductosService.getFirestore().pipe(
      switchMap(data => {
        const lista_productos = data.filter(element => element.idlista_compras === this.id_lista_compras);
        return from(lista_productos); // Convertir el array en un observable
      }),
      concatMap(element => this.listaProductosService.deleteFirestore(element))
    ).subscribe(() => {
      console.log("Producto eliminado");
    });

    this.storeService.quitarProducto(product);
    // this.cart = this.storeService.getCart();
    // this.counter = this.cart.length;
  }

  cerrarSesion(){
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error =>{
      console.log(error);
    })
  }
}
