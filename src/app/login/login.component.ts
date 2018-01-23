import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { DataService } from '../data.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  message: string; // for show msg error and success


  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, public router: Router, public auth: DataService) {
    this.creatSignupForm();
  }

  creatSignupForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(valid, user) {
    if (!valid) {
      this.message = "Must enter email or password";
      return;
    }
    this.message = "";
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((successs) => {
        this.loginFormGroup.reset();
        this.router.navigate(['/todo']);
      }).catch((error) => {
        console.log("Login Error : ", error);
        this.message = error.message;
      })
  }

  // loginGoogle(){}
}
