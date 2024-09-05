import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { OpenTokComponent } from 'src/app/modules/common/component/open-tok/open-tok.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-open-tok-provider-call',
  templateUrl: './open-tok-provider-call.component.html',
  styleUrls: ['./open-tok-provider-call.component.css']
})
export class OpenTokProviderCallComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('openTokModal') openTokModal: OpenTokComponent;
  tokboxId: string;
  constructor(authService: AuthenticationService,
    activeRouter: ActivatedRoute) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.tokboxId = r['{id}'];
    });
  }

  ngAfterViewInit() {
    this.openTokModal.sessionId = this.tokboxId;
    this.openTokModal.show();
  }

  onClosed() {
    var location = window.location.href;
    var ww = window.open(location, '_self');
    ww.close();
  }

}
