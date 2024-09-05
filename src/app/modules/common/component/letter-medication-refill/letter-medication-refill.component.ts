import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-letter-medication-refill',
  templateUrl: './letter-medication-refill.component.html',
  styleUrls: ['./letter-medication-refill.component.css']
})
export class LetterMedicationRefillComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  constructor(public authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit(): void {
  }

  hide() {
    this.modal.hide();
  }

  show() {
    this.modal.show();
  }

}
