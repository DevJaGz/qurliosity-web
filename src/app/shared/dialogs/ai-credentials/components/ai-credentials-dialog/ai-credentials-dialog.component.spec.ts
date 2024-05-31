import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCredentialsDialogComponent } from './ai-credentials-dialog.component';

describe('AiCredentialsDialogComponent', () => {
  let component: AiCredentialsDialogComponent;
  let fixture: ComponentFixture<AiCredentialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCredentialsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
