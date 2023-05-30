import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaComprasService } from 'src/app/services/lista-compras.service';
import { ListaCompras, createListaComprasDTO } from 'src/app/models/lista-compras.model';


@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent {

  valores: any;
  lista_compras: Array<ListaCompras>;
  iduser: String="";
  idlistCompra: String="";

  constructor(
    private auth: Auth,
    private listacomprasservice: ListaComprasService,
    private router: Router, private route: ActivatedRoute
  ){
      this.lista_compras = [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idlistCompra = params['id'];
    });
    this.listacomprasservice.getFirestore().subscribe(data => {
      this.lista_compras = data;
      console.log('data:', data);
      this.iduser = this.auth.currentUser!.uid;
      //filtrar el array por idusuario
      this.lista_compras = this.lista_compras.filter(element => element.idusuario === this.iduser);
      //console.log('lista_compras filtro:', this.lista_compras);
    });
  }

  deleteListaCompra(lista: ListaCompras){
    this.listacomprasservice.deleteFirestore(lista).then(() => {
      console.log("Eliminado");
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/menu']);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  agregarProducto(idlista: any, lista: ListaCompras){
    this.router.navigate(["/tienda"], { queryParams: { id: lista.id, lista: lista }});
  }

  actualizarLista(idlista: any, lista: ListaCompras){
    this.router.navigate(["menu/registroListaCompra"], { queryParams: { id: lista.id, lista: lista }});
  }

  crearLista(){
    this.router.navigate(['menu/registroListaCompra']);
  }

}
