import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from "@angular/router";



@Injectable()
export class DataService implements CanActivate {

  private authState: Observable<firebase.User>
  private authUser: firebase.User = null;
  public currentUser: Observable<any> //firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, public router: Router) {

    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = null;
      }
    });
  }

  canActivate() {
    if (!this.authUser) {
      window.alert("You don't have permission to view this page");
      this.router.navigate(['login']);
      return false;
    } else {
      this.currentUser = this.afs.collection('users').doc(this.authUser.uid).valueChanges()
      return true;
    }
  }
}
