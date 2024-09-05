import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-desk-layout',
  templateUrl: './help-desk-layout.component.html',
  styleUrls: ['./help-desk-layout.component.css']
})
export class HelpDeskLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('body').attr('class','');
    $('body').attr('data-col','');
    $( "body" ).removeClass( "fixed-navbar" );
  }

}
