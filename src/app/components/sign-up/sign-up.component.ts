import { Component, OnInit } from '@angular/core';
//import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { AuthService } from '../../service/auth.service';
//import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
 
  constructor(public authService: AuthService) {

  }
   ngOnInit(): void {
     
   }
}
