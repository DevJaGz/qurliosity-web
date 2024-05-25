import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedSourcesTableRowComponent } from './uploaded-sources-table-row.component';

describe('UploadedSourcesTableRowComponent', () => {
  let component: UploadedSourcesTableRowComponent;
  let fixture: ComponentFixture<UploadedSourcesTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadedSourcesTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadedSourcesTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
