import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Auth,onAuthStateChanged, getAuth} from '@angular/fire/auth';
import { ListaCompras, createListaComprasDTO } from 'src/app/models/lista-compras.model';
import { ListaComprasService } from 'src/app/services/lista-compras.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-lista-compras',
  templateUrl: './crear-lista-compras.component.html',
  styleUrls: ['./crear-lista-compras.component.scss']
})
export class CrearListaComprasComponent {

  lista: createListaComprasDTO = {
      id: '',
      fecha_lista: '',
      nombre_lista: '',
      idusuario: '',
  }
  form = this.formBuilder.nonNullable.group({
    nombre_lista: ['', [Validators.required]],
    fecha_lista: ['', [ Validators.required]],
    auxiliar: [''],
  });
  iduser: String="";
  idlista: number=-1;
  titulo: String="";


  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private listacomprasservice: ListaComprasService
  ){}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.idlista = params['id'],
      this.lista = params['lista']
    });
    if(this.lista){
      this.titulo="Editar";
      this.listacomprasservice.getFirestore().subscribe(data => {
          let result = data.filter(element => element.id === this.idlista.toString());
          this.lista = result[0];
      });
    }else{
      this.titulo="Crear Nueva";
    }
  }

  createUpdateLista(){
    this.route.queryParams.subscribe(params => {
      this.idlista = params['id']});
      if(this.lista){ // ACTUALIZAR
        const { nombre_lista, fecha_lista } = this.form.getRawValue();
        this.iduser = this.auth.currentUser!.uid;
        this.lista = {
          fecha_lista: fecha_lista,
          nombre_lista: nombre_lista,
          idusuario: this.iduser,
        }
        this.listacomprasservice.updateFirestore(this.idlista,this.lista).then(data => {
          this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate(['/menu']);
          });
        });
      }else{ //  CREAR NUEVO
          // OBTENER DATOS DEL FORMULARIO
          const { nombre_lista, fecha_lista } = this.form.getRawValue();
          // OBTENER EL ID DE USUARIO ACTUAL
          this.iduser = this.auth.currentUser!.uid;
          // GENERAR LISTA DE COMPRAS A PARTIR DE LA INTERFAZ
          this.lista = {
            fecha_lista: fecha_lista,
            nombre_lista: nombre_lista,
            idusuario: this.iduser,
          }
          // ACCEDIENDO AL SERVICIO PARA CREAR UNA LISTA DE PRODUCTOS
          this.listacomprasservice.createFirestore(this.lista).then(list =>
            this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
              this.router.navigate(['/menu']);
            })
          );
      }
  }

  atras(){
    this.router.navigate(['/menu']);
  }
}
