import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSourceDialogComponent } from './upload-source-dialog.component';

describe('UploadSourceDialogComponent', () => {
  let component: UploadSourceDialogComponent;
  let fixture: ComponentFixture<UploadSourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSourceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadSourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
