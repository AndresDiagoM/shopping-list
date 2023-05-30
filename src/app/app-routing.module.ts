import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { NavComponent } from './components/nav/nav.component';
//----canActivate para proteger las rutas---
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListaComprasComponent } from './components/lista-compras/lista-compras.component';
import { CrearListaComprasComponent } from './components/crear-lista-compras/crear-lista-compras.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'menu', component: ListaComprasComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'menu/registroListaCompra', component: CrearListaComprasComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'tienda', component: ProductsComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
