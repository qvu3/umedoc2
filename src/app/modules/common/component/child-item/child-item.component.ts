import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PatientProfileService } from '../../services/patient-profile.service';
import { PatientChildModalComponent } from '../patient-child-modal/patient-child-modal.component';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css'],
  providers:[DatePipe]
})
export class ChildItemComponent extends BaseComponent implements OnInit {
  @Input() model: PatientProfileModel;
  @Output() onChangedChild: EventEmitter<any> = new EventEmitter();
  @ViewChild('editModal') modal: PatientChildModalComponent;
  constructor(authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe) {
    super(authService);
  }

  ngOnInit(): void {
  }

  editChild() {
    if (this.model && this.model.ID)
      this.modal.show(this.model.ID, null);
  }

  deleteChild() {
    if (this.model && this.model.ID) {
      this.dialog.showSwalConfirmAlert('Are you sure to delete this item', false).then(isConfim => {
        if (isConfim) {
          this.patientProfileService.DeleteChild(this.model.ID).subscribe(r => {
            this.onChangedChild.emit(true);
            this.dialog.showSwalSuccesAlert('Delete Child', MessageConstant.DEL_SUCCESS_CONST)
          }, error => {
            this.dialog.showSwalErrorAlert('Delete Child', "Cannot delete the child who have existed appointment");
          });
        }
      });
    }

  }

  closeModal() {
    this.onChangedChild.emit(true);
  }

  transformDob(data) {
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }

}
