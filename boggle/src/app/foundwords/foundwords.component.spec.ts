import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundwordsComponent } from './foundwords.component';

describe('FoundwordsComponent', () => {
  let component: FoundwordsComponent;
  let fixture: ComponentFixture<FoundwordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundwordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
