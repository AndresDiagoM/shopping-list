import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(5)]],
  });

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router){}

  onSubmit(){
    console.log(this.form.value);
    this.userService.register(this.form.value)
    .then(response => { console.log(response);
    this.router.navigate(['/login'])
  })
    .catch(error => console.log(error));
  }

}
