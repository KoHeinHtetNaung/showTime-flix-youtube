import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { MovieApiServiceService } from '../../service/movie-api-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private service: MovieApiServiceService) {}

  searchResult:any;

  ngOnInit(): void {}

  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  submitForm() {
    console.log('searchForm', this.searchForm.value);
    this.service.getSearchMovie(this.searchForm.value).subscribe(result => {
      console.log('searchMovie', result)
      this.searchResult = result.results;
    })
  }
}
