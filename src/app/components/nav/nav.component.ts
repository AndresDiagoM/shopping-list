import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Auth,onAuthStateChanged, getAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  menuStatus = false;
  counter = 0;
  email: any="";

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
    private auth: Auth,
  ) { }

  ngOnInit(): void {
    this.storeService.cartBehavior$.subscribe((cart) => {
      this.counter = cart.length;
    });
    this.email = this.auth.currentUser!.email;
    console.log("emaill: "+this.email);
  }

  ocultarMenu(event: Event) {
    this.menuStatus = !this.menuStatus;
    console.log(event);
  }

  onClick(){
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error =>{
      console.log(error);
    })
  }

}
