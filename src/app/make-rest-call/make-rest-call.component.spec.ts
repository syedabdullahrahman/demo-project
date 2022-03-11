import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRestCallComponent } from './make-rest-call.component';

describe('MakeRestCallComponent', () => {
  let component: MakeRestCallComponent;
  let fixture: ComponentFixture<MakeRestCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeRestCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRestCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
