import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePromptComponent } from './template-prompt.component';

describe('TemplatePromptComponent', () => {
  let component: TemplatePromptComponent;
  let fixture: ComponentFixture<TemplatePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
