import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSourceComponent } from './template-source.component';

describe('TemplateSourceComponent', () => {
  let component: TemplateSourceComponent;
  let fixture: ComponentFixture<TemplateSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
