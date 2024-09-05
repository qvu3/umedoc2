import { Directive, AfterViewInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentImageModel } from '../models/appointment-image.model';
declare var $: any;
@Directive({
  selector: '[appImgGallery]'
})
export class ImgGalleryDirective implements AfterViewInit, OnChanges {
  @Input() source: Array<AppointmentImageModel>;
  constructor(private ele: ElementRef) {

  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.source && params.source.currentValue) {
      this.register();
    }

  }

  ngAfterViewInit() {
    this.register();
  }

  register() {
    setTimeout(function () {
      $(this.ele.nativeElement).lightGallery({
        thumbnail: true,
        selector: 'a'
      });
    }.bind(this), 100);
  }
}
