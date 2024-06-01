import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePromptVarComponent } from './template-prompt-var.component';

describe('TemplatePromptVarComponent', () => {
  let component: TemplatePromptVarComponent;
  let fixture: ComponentFixture<TemplatePromptVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePromptVarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePromptVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
