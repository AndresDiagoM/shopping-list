import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(){
    this.userService.login(this.form.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['menu']);
    }).catch(error => console.log(error));
  }
}
