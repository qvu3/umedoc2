import { TwillioCallClientDirective } from './twillio-call-client.directive';
import { ElementRef } from '@angular/core';
import { CommonDialogService } from '../services/dialog.service';
import { UtilityService } from '../services/utility.service';

describe('TwillioCallClientDirective', () => {
  let mockElementRef: ElementRef;
  let mockUtilityService: UtilityService;
  let mockDialogService: CommonDialogService;

  beforeEach(() => {
    // Mock ElementRef
    mockElementRef = new ElementRef(document.createElement('div'));

    // Mock services
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['GenerateTwilioToken']);
    mockDialogService = jasmine.createSpyObj('CommonDialogService', ['showSwalWarningAlert']);
  });

  it('should create an instance', () => {
    const directive = new TwillioCallClientDirective(mockElementRef, mockUtilityService, mockDialogService);
    expect(directive).toBeTruthy();
  });
});
