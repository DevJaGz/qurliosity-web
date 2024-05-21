import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSourcesComponent } from './template-sources.component';

describe('TemplateSourcesComponent', () => {
  let component: TemplateSourcesComponent;
  let fixture: ComponentFixture<TemplateSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
