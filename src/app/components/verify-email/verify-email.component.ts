import { Component, OnInit } from '@angular/core';
//import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { AuthService } from '../../service/auth.service';
//import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService) {

  }
  
  ngOnInit(): void {
    
  }
}
