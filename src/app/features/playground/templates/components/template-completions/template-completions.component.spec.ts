import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCompletionsComponent } from './template-completions.component';

describe('TemplateCompletionsComponent', () => {
  let component: TemplateCompletionsComponent;
  let fixture: ComponentFixture<TemplateCompletionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCompletionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateCompletionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
