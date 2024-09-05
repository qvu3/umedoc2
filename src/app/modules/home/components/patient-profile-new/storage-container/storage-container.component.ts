import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-storage-container',
  templateUrl: './storage-container.component.html',
  styleUrls: ['./storage-container.component.css']
})
export class StorageContainerComponent extends BaseComponent implements OnInit {

  constructor(authService:AuthenticationService) { 
    super(authService);
  }

  ngOnInit(): void {
  }

}
