import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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


  constructor(private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private auth: Auth,
    private listacompras: ListaComprasService,
    private router: Router,
    private route: ActivatedRoute,
    private listacomprasservice: ListaComprasService
    ){}

    ngOnInit(): void{
      this.route.queryParams.subscribe(params => {
      this.idlista = params['id']});
        if(this.idlista >= 0){
          this.titulo="Editar";
          this.listacomprasservice.listarCompras().subscribe(data => {
            const ids = Object.keys(data);
            this.listacomprasservice.getById(ids[this.idlista])?.subscribe(data => {
              this.lista = data;
            });
          });
        }else{
          this.titulo="Crear Nueva";
        }
    }
  createUpdateLista(){
    this.route.queryParams.subscribe(params => {
      this.idlista = params['id']});
      if(this.idlista >= 0){ // ACTUALIZAR
        const { nombre_lista, fecha_lista } = this.form.getRawValue();
        this.iduser = this.auth.currentUser!.uid;
        this.lista = {
          fecha_lista: fecha_lista,
          nombre_lista: nombre_lista,
          idusuario: this.iduser,
        }
        this.listacomprasservice.listarCompras().subscribe(data => {
          const ids = Object.keys(data);
          this.listacomprasservice.update(ids[this.idlista],this.lista).subscribe(data => {
            this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
              this.router.navigate(['/menu']);
            });
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
          this.listacompras.create(this.lista).subscribe(list =>
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
