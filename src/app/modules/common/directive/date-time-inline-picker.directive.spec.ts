import { DateTimeInlinePickerDirective } from './date-time-inline-picker.directive';
import { ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppointmentSlotService } from '../services/appointment-slot.service';
import { ProviderProfileService } from '../services/provider-profile.service';

describe('DateTimeInlinePickerDirective', () => {
  let mockElementRef: ElementRef;
  let mockDatePipe: DatePipe;
  let mockAppointmentSlotService: AppointmentSlotService;
  let mockProviderProfileService: ProviderProfileService;

  beforeEach(() => {
    // Mock the ElementRef
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;

    // Mock the DatePipe
    mockDatePipe = new DatePipe('en-US');

    // Mock AppointmentSlotService and ProviderProfileService
    mockAppointmentSlotService = jasmine.createSpyObj('AppointmentSlotService', ['someMethod']);
    mockProviderProfileService = jasmine.createSpyObj('ProviderProfileService', ['someMethod']);
  });

  it('should create an instance', () => {
    const directive = new DateTimeInlinePickerDirective(
      mockElementRef,
      mockDatePipe,
      mockAppointmentSlotService,
      mockProviderProfileService
    );
    expect(directive).toBeTruthy();
  });
});
