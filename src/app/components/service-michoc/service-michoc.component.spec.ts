import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMichocComponent } from './service-michoc.component';

describe('ServiceMichocComponent', () => {
  let component: ServiceMichocComponent;
  let fixture: ComponentFixture<ServiceMichocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMichocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMichocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
