import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MovieApiServiceService implements OnInit {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '19e6ed2e4211410983e6bebcbcb2a2d8';

  constructor(private http: HttpClient) {}

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
}
