import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, Category } from '../../models/product.model'; //importamos el modelo de datos
import { Auth,onAuthStateChanged, getAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service'; //importamos el servicio
import { ProductsService } from '../../services/products.service';
import { ListaComprasService } from 'src/app/services/lista-compras.service';
import { ListaProductosService } from 'src/app/services/lista-productos.service';
import { ListaCompras } from 'src/app/models/lista-compras.model';
import { ListaProductos } from 'src/app/models/lista-producto.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements  OnInit {

  // -- Propiedades --
  cart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 5, 1);
  detailState = false;
  productDetail: Product = {
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
  createState = false;
  limit = 10;
  offset = 0;
  iduser= "";
  id_lista_compras= "";
  lista_producto: ListaProductos = {
    id: '',
    idlista_compras: '',
    idproducto: '',
    estado: false,
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private auth: Auth, // para agregar listas de productos a la lista de compras, FIRESTORE
    private router: Router,
    private route: ActivatedRoute,
    private listacomprasservice: ListaComprasService,
    private listaProductosService: ListaProductosService
  ) {
    //this.cart = this.storeService.getCart(this.id_lista_compras);
    this.total = this.storeService.getTotal();
  }

  ngOnInit(): void { // Asincrono
    // Con Firestore
    this.productsService.getPageFirestore(this.offset.toString(),this.limit).subscribe((products) => {
      //console.log('products', products);
      this.products = products;
    });
    this.route.queryParams.subscribe(params => {
      this.id_lista_compras = params['id'],
      this.iduser = this.auth.currentUser!.uid,
      console.log('iduser:', this.iduser, 'id_lista_compras:', params['id']);
      this.lista_producto.idlista_compras = this.id_lista_compras;
    });
  }

  // --------- METODOS ----------
  addToCart(product: Product) {
    //console.log('product', product);
    this.storeService.addToCart(product);
    this.total = this.storeService.getTotal();

    // -- Crear una lista_compras en FIRESTORE--
    this.lista_producto.idproducto = product.id;
    this.lista_producto.estado = true;
    this.listaProductosService.createFirestore(this.lista_producto).then((response) => {
      console.log('response-create-prod-list: ', response.id, 'id_lista_compras: ', this.id_lista_compras);
    });
  }



  closeDetail() {
    this.detailState = !this.detailState;
  }

  onShowDetail(id: string) {
    if(!this.detailState) {
      this.detailState = true; // mostrar panel de detalle
      this.createState = false; // ocultar panel de creacion
    }
    this.productsService.getProduct(id).subscribe((product) => {
      this.productDetail = product;
      //console.log('product', product);
    });
  }

  closeCreateProduct() {
    this.createState = !this.createState;
    this.detailState = false; // ocultar panel de detalle
  }

  // --------- METODOS FIRESTORE ----------
  async onNewProduct(newProduct: Product | createProductDTO) {
    const response= await this.productsService.createFirestore(newProduct);
    console.log('response', response);
    this.products.push(newProduct as Product);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteFirestore(product).then(() => {
      //console.log('Producto eliminado');
      this.products = this.products.filter((productFilter) => productFilter.id !== product.id);
    });
  }

  updateProduct(product: Product) {
    const dto: createProductDTO = {
      title: product.title,
      price: product.price,
      image: product.image,
      images: product.images,
      categoryId: 1,
      description: product.description
    }
    //console.log('dto', product);
    this.productsService.updateFirestore(product.id, product).then(() => {
      //console.log('Producto actualizado');
      this.products = this.products.map((productMap) => { // actualizar la lista de productos
        if(productMap.id === product.id) {
          productMap = product;
        }
        return productMap;
      });
    });
  }

  // -- Metodos de paginacion --
  nextPage() {
    this.offset += this.limit;
    this.productsService.getPageFirestore(this.offset.toString(), this.limit).subscribe((products) => {
      this.products = products;
    });
  }
  prevPage() {
    this.offset -= this.limit;
    this.productsService.getPageFirestore(this.offset.toString(), this.limit).subscribe((products) => {
      this.products = products;
    });
  }
}

// se crea un componente con "ng g c components/products"
