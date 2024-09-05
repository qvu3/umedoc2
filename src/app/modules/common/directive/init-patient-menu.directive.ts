import { Directive, AfterViewInit } from '@angular/core';  

@Directive({
  selector: '[appInitPatientMenu]'
})
export class InitPatientMenuDirective implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.register();
    }, 500);
  }

  register() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $(window).resize(function () {
      const windowWidth = $(window).width();  // Get the window width
      if (windowWidth !== undefined && windowWidth > 960) {  // Ensure it's defined
        $('#overlay').addClass('overlay');
        $('#whenoverlay').addClass('whenoverlay');
      } else {
        $('#overlay').removeClass('overlay');
        $('#whenoverlay').removeClass('whenoverlay');
      }
    });
  }
}
