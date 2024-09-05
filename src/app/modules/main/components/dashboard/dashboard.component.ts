import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog:CommonDialogService) { }

  ngOnInit() { 
    
    
  }

}
