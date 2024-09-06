import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import {
  AngularFirestore,AngularFirestoreDocument
} from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth'

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
     
  ) {
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    });
  }

  //sign-in
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user)
        this.toastr.success('User Sign-in Successfully!')
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {      
        this.SendVerificationMail();
        this.SetUserData(result.user);
        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastr.warning('Password reset email send, check your inbox');
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser ///
      .then((u: any) => {
        if(u) {
          return u.sendEmailVerification();
        }
        else{
          throw new Error('No use is currently sign-in')
        }
      }) ///
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!); // ! check
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `tmdbUsers/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
    
  }
}
