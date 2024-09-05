import { Directive, Pipe, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe {
  constructor(private santizer: DomSanitizer) {

  }
  transform(value: string): unknown {
    return value ? this.santizer.bypassSecurityTrustResourceUrl(value) : '';
  }

}
