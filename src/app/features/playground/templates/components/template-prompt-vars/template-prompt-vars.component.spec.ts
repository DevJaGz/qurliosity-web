import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePromptVarsComponent } from './template-prompt-vars.component';

describe('TemplatePromptVarsComponent', () => {
  let component: TemplatePromptVarsComponent;
  let fixture: ComponentFixture<TemplatePromptVarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePromptVarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePromptVarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
