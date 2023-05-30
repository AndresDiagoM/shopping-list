import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { UserService } from 'src/app/services/user.service';
import { ListaProductosService } from 'src/app/services/lista-productos.service';
import { ListaCompras } from 'src/app/models/lista-compras.model';
import { ListaProductos } from 'src/app/models/lista-producto.model';

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

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth,
    private listaProductosService: ListaProductosService
  ) { }

  ngOnInit(): void {
    this.storeService.cartBehavior$.subscribe((cart) => {
      this.counter = cart.length;
      //console.log('cart', cart);
    });
    this.cart = this.storeService.getCart();
    this.email = this.auth.currentUser!.email;
    this.iduser = this.auth.currentUser!.uid;
    console.log("[app-nav] email:",this.email, ", iduser:", this.iduser);
  }

  ocultarMenu(event: Event) {
    this.menuStatus = !this.menuStatus;
    console.log(event);
  }

  ocultarLista() {
    this.listState = !this.listState;
  }

  quitarPorducto(product: Product) {
    this.storeService.quitarProducto(product);
    this.cart = this.storeService.getCart();
    this.counter = this.cart.length;

    // Eliminar de la lista de.deleteFirestorere
    // this.listaProductosService.deleteFirestore().then(() => {
    //   console.log("Eliminado");
    // });
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
