import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCredentialButtonComponent } from './ai-credential-button.component';

describe('AiCredentialButtonComponent', () => {
  let component: AiCredentialButtonComponent;
  let fixture: ComponentFixture<AiCredentialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCredentialButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiCredentialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
