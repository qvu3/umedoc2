import { AfterViewInit, Component, OnInit } from '@angular/core'; 
import { DomSanitizer } from '@angular/platform-browser';
import Global from 'src/app/Global';
@Component({
  selector: 'app-guid-line',
  templateUrl: './guid-line.component.html',
  styleUrls: ['./guid-line.component.css']
})
export class GuidLineComponent implements OnInit , AfterViewInit {
  link:any;
  constructor(stanitizer: DomSanitizer ) { 
    let url  = `${Global.apiUrl}/guide/story.html`;
    this.link = stanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){ 
  } 
}
