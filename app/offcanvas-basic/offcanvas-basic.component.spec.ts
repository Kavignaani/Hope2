import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasBasicComponent } from './offcanvas-basic.component';

describe('OffcanvasBasicComponent', () => {
  let component: OffcanvasBasicComponent;
  let fixture: ComponentFixture<OffcanvasBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffcanvasBasicComponent]
    });
    fixture = TestBed.createComponent(OffcanvasBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
