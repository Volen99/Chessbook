import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { hotkeys } from './hotkeys.component';

describe('HotkeysComponent', () => {
  let component: hotkeys;
  let fixture: ComponentFixture<hotkeys>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ hotkeys ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(hotkeys);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
