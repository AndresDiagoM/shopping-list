import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { UserService } from 'src/app/services/user.service';
import { ListaProductosService } from 'src/app/services/lista-productos.service';
import { ListaCompras } from 'src/app/models/lista-compras.model';
import { ListaProductos } from 'src/app/models/lista-producto.model';

import { Auth,onAuthStateChanged, getAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  cart : Product[] = [];
  cart1 : Product[] = [];
  listaproductos: ListaProductos[] = [];
  menuStatus = false;
  counter = 0;
  email: any="";
  listState = false;
  iduser: any="";
  id_lista_compras= "";

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth,
    private listaProductosService: ListaProductosService,
    private productosService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    this.id_lista_compras = params['id'];
    console.log("consola del nav: "+this.id_lista_compras);
     });

    this.storeService.cartBehavior$.subscribe((cart) => {
      this.counter = cart.length;
      //console.log('cart', cart);
    });
    //this.cart = this.storeService.getCart(this.id_lista_compras);
    this.storeService.getCart().subscribe(data => {
      //this.cart = data;
      this.listaproductos = data;
      console.log("Mi productos: "+data);
      //LISTA DE PRODUCTOS
      this.listaproductos = this.listaproductos.filter(element => element.idlista_compras === this.id_lista_compras);
      console.log("lista de productos filtrada: ",this.listaproductos);
    });

    this.productosService.getFirestore().subscribe(data => { //productos all
      this.cart1 = data;
      console.log("prueba",this.listaproductos);
      this.cart1 = this.cart1.filter(elem => {
        this.listaproductos.forEach(elem1 => {
          if(elem.id === elem1.idproducto){
            this.cart.push(elem);

          }
        });
      });
      this.counter = this.cart.length;
      console.log("ejemplo ",this.cart);
      });

      console.log("productos en el carrito: ",this.listaproductos);

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
    //this.cart = this.storeService.getCart();
    this.counter = this.cart.length;

    // Eliminar de la lista de.deleteFirestorere
    // this.listaProductosService.deleteFirestore().then(() => {
    //   console.log("Eliminado");
    // }
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
