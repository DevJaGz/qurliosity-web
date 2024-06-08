import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCompletionComponent } from './template-completion.component';

describe('TemplateCompletionComponent', () => {
  let component: TemplateCompletionComponent;
  let fixture: ComponentFixture<TemplateCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCompletionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
