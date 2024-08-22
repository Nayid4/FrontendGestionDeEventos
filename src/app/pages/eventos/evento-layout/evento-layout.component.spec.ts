import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoLayoutComponent } from './evento-layout.component';

describe('EventoLayoutComponent', () => {
  let component: EventoLayoutComponent;
  let fixture: ComponentFixture<EventoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
