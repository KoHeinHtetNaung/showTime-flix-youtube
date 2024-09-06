import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'node:console';
import e from 'express';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute
  ) {}

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult:any;

  ngOnInit(): void {
    let getId = this.router.snapshot.paramMap.get('id');
    console.log('getId :', getId)
    this.getMovie(getId);
    this.getVideo(getId);
    this.getMovieCast(getId);
  }

  getMovie(id:any) {
    this.service.getMovieDetails(id).subscribe(result => {
      console.log('moviedetail', result)
      this.getMovieDetailResult = result;
    })
  }

  getVideo(id:any) {
    this.service.getMovieVideo(id).subscribe(result => {
      console.log('getResultVideo:', result)
      result.results.forEach((element:any) => {
        if(element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
          
        }
      });
      
    })
  }

  getMovieCast(id:any) {
    this.service.getMovieCast(id).subscribe(result => {
      console.log('moviecast: ', result)
      this.getMovieCastResult = result.cast;
    })
  }
}
