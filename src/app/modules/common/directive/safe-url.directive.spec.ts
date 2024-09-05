import { SafeUrlPipe } from './safe-url.directive'; // or safe-url.pipe if it's a pipe
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  let mockSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    // Create a mock of the DomSanitizer
    mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: DomSanitizer, useValue: mockSanitizer }
      ]
    });
  });

  it('should create an instance', () => {
    // Pass the mock sanitizer to the pipe
    const pipe = new SafeUrlPipe(mockSanitizer);
    expect(pipe).toBeTruthy();
  });
});
