import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  signupFormGroup: FormGroup;
  isFormSubmit: boolean = false; // for loader
  message: string; // for show msg error and success
  emailRegex: string = "^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.creatSignupForm();
  }

  creatSignupForm() {
    this.signupFormGroup = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', Validators.required],
      number: [''],
      address: [''],
    })
  }

  createUser(valid, data) {
    this.isFormSubmit = true; // for loader
    if (!valid) {
      this.message = "Some Fields are required";
      return;
    }
    this.message = "";
    this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((successs) => {
        this.afs.collection('users').doc(successs.uid).set({
          userName: data.userName,
          email: data.email,
          number: data.number,
          address: data.address,
        }).then(successs1 => {
          this.signupFormGroup.reset();
          this.isFormSubmit = false; // for loader
          this.router.navigate(['/login']);
        }, err => {
          this.isFormSubmit = false; // for loader
          this.message = err;
          console.log("Data saved error", err);
        })
      }).catch((error) => {
        this.isFormSubmit = false; // for loader
        this.message = error.message;
        console.log("Auth error", error);
      })
  }






}
