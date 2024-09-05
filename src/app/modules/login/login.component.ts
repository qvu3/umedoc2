import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    $('body').attr('class','');
    $('body').attr('data-col','');
    $( "body" ).removeClass( "fixed-navbar" );
  }
}