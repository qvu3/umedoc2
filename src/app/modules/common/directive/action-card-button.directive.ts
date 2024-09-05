import { Directive, AfterViewInit, Input, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
declare var $: any;
@Directive({
  selector: '[appActionCardButton]'
})
export class ActionCardButtonDirective implements AfterViewInit, OnChanges {
  @Input()
  appActionCardButton!: string;
  constructor() {

  }
  ngAfterViewInit() {
    this.register();

  }

  ngOnChanges() {
    this.register();
  }

  register() {
    // Match the height of each card in a row
    setInterval(() => {
      $('.row.match-height').each(() => {
        $(this).find('.card').not('.card .card').matchHeight(); // Not .card .card prevents collapsible cards from taking height
      });
    }, 200);

    $('.card .heading-elements a[data-action="collapse"]')
      .off('click')
      .on('click', function (this: any) {
        var $this = $(this),
          card = $this.closest('.card');
        var cardHeight;
    
        if (parseInt(card[0].style.height, 10) > 0) {
          cardHeight = card.css('height');
          card.css('height', '').attr('data-height', cardHeight);
        }
        else {
          if (card.data('height')) {
            cardHeight = card.data('height');
            card.css('height', cardHeight).attr('data-height', '');
          }
        }
      });
    //card heading actions buttons small screen support
    $(".heading-elements-toggle")
      .off('click')
      .on("click", function (this: HTMLElement) {
        if (!$(this).parent().children(".heading-elements").hasClass("visible")) {
          $(this).parent().children(".heading-elements").addClass("visible")
        }
        else {
          $(this).parent().children(".heading-elements").removeClass("visible")
        }
      });


    // Collapsible Card
    $('a[data-action="collapse"]')
      .off('click')
      .on('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        $(this).closest('.card').children('.card-content').collapse('toggle');
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ft-plus ft-minus');
      });

    // Toggle fullscreen
    $('a[data-action="expand"]')
      .off('click')
      .on('click',  (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('ft-maximize ft-minimize');
        $(this).closest('.card').toggleClass('card-fullscreen');
      });

    // Close Card
    $('a[data-action="close"]')
      .off('click')
      .on('click',  () => {
        $(this).closest('.card').removeClass().slideUp('fast');
      });
  }

}
