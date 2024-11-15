import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsitorComponent } from './regsitor.component';

describe('RegsitorComponent', () => {
  let component: RegsitorComponent;
  let fixture: ComponentFixture<RegsitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegsitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
