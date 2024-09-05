import { InitAppChatDirective } from './init-app-chat.directive';
import { DeviceDetectorService } from 'ngx-device-detector'; // Make sure to import the service from the correct location

describe('InitAppChatDirective', () => {
  let mockDeviceService: jasmine.SpyObj<DeviceDetectorService>;

  beforeEach(() => {
    // Mock the DeviceDetectorService
    mockDeviceService = jasmine.createSpyObj('DeviceDetectorService', ['isMobile', 'isTablet', 'isDesktop']);
  });

  it('should create an instance', () => {
    // Provide the mocked service to the directive
    const directive = new InitAppChatDirective(mockDeviceService);
    expect(directive).toBeTruthy();
  });
});
