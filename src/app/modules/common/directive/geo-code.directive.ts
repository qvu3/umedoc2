import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[appGeoCode]'
})
export class GeoCodeDirective implements AfterViewInit  {
  @Input()
  lat!: number;
  @Input()
  lon!: number; 
  @Output() onSearchCompleted: EventEmitter<any> = new EventEmitter();
  constructor(private ele: ElementRef) { }

  ngAfterViewInit() {
    this.Register();
  }

  
  Register() {
    var geo = $(this.ele.nativeElement).geocomplete({
      details: ".geo-details",
      detailsAttribute: "data-geo" 
    });
    
    geo.bind("geocode:result",  (event: any, result: any) => {
      this.onSearchCompleted.emit(result);
    }); 
  }
}
