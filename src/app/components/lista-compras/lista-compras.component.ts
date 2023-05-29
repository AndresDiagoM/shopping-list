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
  liCompras: Array<ListaCompras>;
  liCompras2: Array<ListaCompras>;
  indice: Array<number>;
  iduser: String="";
  idlistCompra: String="";

  constructor(private auth: Auth,
    private listacomprasservice: ListaComprasService,
    private router: Router, private route: ActivatedRoute){
      this.liCompras = [];
      this.liCompras2 = [];
      this.indice = [];
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.idlistCompra = params['id'];
      });

      this.listacomprasservice.listarCompras().subscribe(data => {
        // ejemplo = { a(llave): = {v,c}(valores llave), b: = {k,l}}
        console.log(data);
        const ids = Object.keys(data); // valores de las llaves
        console.log(ids[1])
        this.liCompras = Object.values(data); // valores internos de cada llave
        console.log(this.liCompras);
        this.iduser = this.auth.currentUser!.uid;
        this.liCompras.forEach(element => {
          if(element.idusuario === this.iduser){
            this.indice.push(this.liCompras.indexOf(element)); //indice del array lista_compra
            this.liCompras2.push(element);
          }

       });

      });

    }

    deleteListaCompra(ind: number){ // 0 1
      // console.log("delete: "+ind);
      // console.log(this.indice);
      this.indice.forEach(element => { // 0:3, 1:4
        if(this.indice.indexOf(element) === ind){
          console.log("eliminar: "+this.indice[ind]);
          this.listacomprasservice.listarCompras().subscribe(data => {
            const ids = Object.keys(data);
            console.log(ids[this.indice[ind]]);
            this.listacomprasservice.delete(ids[this.indice[ind]]).subscribe(data => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/menu']);

              });

            });
          });
        }
      });
    }

    actualizarLista(idlista: any, lista: ListaCompras){
      this.router.navigate(["menu/registroListaCompra"], { queryParams: { id: idlista }});
    }


  crearLista(){
    this.router.navigate(['menu/registroListaCompra']);
  }

}
