import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CommonDialogService } from '../services/dialog.service';
import { UtilityService } from '../services/utility.service'; 
declare var Twilio: any;
@Directive({
  selector: '[appTwillioCallClient]'
})
export class TwillioCallClientDirective {
  @Input() phoneNumber: string;
  @Input() clientName: string;
  constructor(private ele: ElementRef, private utilityService: UtilityService,
    private dialog: CommonDialogService) {

  }

  @HostListener('click') clickCall() {
    if (this.phoneNumber && this.clientName) {
      this.phoneNumber = '+84363056106';
      this.utilityService.GenerateTwilioToken(this.clientName).subscribe(r => {
        if (r) {
          Twilio.Device.setup(r);
        }
      }, error => {
        this.dialog.showSwalWarningAlert('Call Client',  'Cannot execute to make a calling for this client.' );
      });
      Twilio.Device.on('ready', function (device) {
        var params = { "phoneNumber": this.phoneNumber };
        Twilio.Device.connect(params);
      }.bind(this));
    }
  }
}
