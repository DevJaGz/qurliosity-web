import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedSourcesTableComponent } from './uploaded-sources-table.component';

describe('UploadedSourcesTableComponent', () => {
  let component: UploadedSourcesTableComponent;
  let fixture: ComponentFixture<UploadedSourcesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadedSourcesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadedSourcesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
