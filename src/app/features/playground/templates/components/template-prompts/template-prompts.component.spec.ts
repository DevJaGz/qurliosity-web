import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePromptsComponent } from './template-prompts.component';

describe('TemplatePromptsComponent', () => {
  let component: TemplatePromptsComponent;
  let fixture: ComponentFixture<TemplatePromptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePromptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
