import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFromGithubComponent } from './get-from-github.component';

describe('GetFromGithubComponent', () => {
  let component: GetFromGithubComponent;
  let fixture: ComponentFixture<GetFromGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFromGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFromGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
