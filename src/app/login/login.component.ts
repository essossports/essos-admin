import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // onSubmit(): void {
  //   const rawForm = this.form.getRaw
  // }


  // userForm: FormGroup;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // constructor() {
  //   this.userForm = new FormGroup({
  //     email: new FormControl(""),
  //     password: new FormControl(""),
  //   })
  // }
  firebaseAuth = inject(Auth);
  router = inject(Router);
  
  onSubmit(): void {
    console.log(this.loginForm.value);
    const rawForm = this.loginForm.getRawValue();
    this.login(rawForm.email!, rawForm.password!).subscribe({
      next: () => {this.router.navigateByUrl('/');},
      error: (err) => {
        console.log(err);
        alert("Incorrect Email or Password!");
      }
    });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }
}
