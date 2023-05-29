import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product, createProductDTO } from '../../models/product.model';

// --------SERVICES--------
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit  {

  // --------Propiedades--------
  status: boolean = false;
  product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    images: [''],
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
  newProduct: createProductDTO = {
    title: 'Producto nuevo',
    price: 1000,
    image: 'https://picsum.photos/200/300',
    images: [],
    categoryId: 4,
    description: 'Description'
  };
  @Output() newProductEvent = new EventEmitter<Product>();

  // --------CONSTRUCTOR--------
  constructor() { }

  ngOnInit(): void {
  }


  // --------MÉTODOS--------
  onCreate() {
    //console.log('this.register');
    this.newProductEvent.emit(this.product);
  }
}
