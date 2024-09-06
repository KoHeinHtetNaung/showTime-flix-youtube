import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';

 import {
  AngularFirestore, AngularFirestoreDocument
 } from '@angular/fire/compat/firestore'
 import { AngularFireAuth } from '@angular/fire/compat/auth';
 import { Router } from '@angular/router';
 import * as auth from 'firebase/auth'
import { User } from './user';
import { emit } from 'process';


@Injectable({
  providedIn: 'root',
})
export class MovieApiServiceService implements OnInit {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '19e6ed2e4211410983e6bebcbcb2a2d8';

  userData: any;

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if(user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData))
    //     JSON.parse(localStorage.getItem('user')!)
    //   }else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!)
    //   }
    // })
  }

  ngOnInit(): void {}

  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/trending/all/week?api_key=${this.apiKey}`
    );
  }

  //tranding movies
  trandingMoviesApiData(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  //search movies
  getSearchMovie(data: any): Observable<any> {
    console.log('movie', data);
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${data.movieName}`
    );
  }

  //movies details
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}?api_key=${this.apiKey}`
    );
  }

  //getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}/videos?api_key=${this.apiKey}`
    );
  }

  //getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}/credits?api_key=${this.apiKey}`
    );
  }

  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28`
    );
  }

  //adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=12`
    );
  }

  //animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=16`
    );
  }

  //comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=35`
    );
  }

  //documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=99`
    );
  }

  //Science-fiction

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=878`
    );
  }

  //thriller
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=53`
    );
  }

  SignIn(email:string, password: string) {
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe(user => {
        if(user) {
          this.router.navigate(['home'])
        }
      })
    })
    .catch(err => {
      window.alert(err.message)
    })
  }

  SignUp(email:string, password: string) {
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      this.SendVerificationMail()
      this.SetUserData(result.user)
    })
    .catch(error => {
      window.alert (error.message)
    })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
    .then ((u: any) => u.sendEmailVerification())
    .then ( () => {
      this.router.navigate(['verify-email-address']);
    })
  }

  SetUserData(user:any) {
    const userRef : AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    })
  }
}
