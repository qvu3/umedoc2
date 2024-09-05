import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GenerateExcelReportCriteria } from 'src/app/modules/common/criterias/gerenate-excel-report.criteria';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-generate-excel-report',
  templateUrl: './generate-excel-report.component.html',
  styleUrls: ['./generate-excel-report.component.css']
})
export class GenerateExcelReportComponent extends BaseComponent implements OnInit {
  criteria: GenerateExcelReportCriteria = new GenerateExcelReportCriteria();
  constructor(public authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {
  }

  generateExcelReport(){
    var filename = 'kkkk.xlsx';
    this.appointmentService.DownloadGenerateExcelReport(this.criteria)
      .subscribe(r => {
        if (r) {
          var headers = r.headers;
          console.log(headers);
          var contentDisposition = headers.get('content-disposition');
          if (contentDisposition) {
            var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replace(/"/g, '');
            this.downloadBlod(r.body, filename);
          }
        }
      },
        error => {
          this.dialog.showToastrError(
            'Error',
            MessageConstant.FAILURE_REQUEST
          );
        })
  }
}
