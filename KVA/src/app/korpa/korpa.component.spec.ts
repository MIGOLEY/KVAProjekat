import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpaComponent } from './korpa.component';

describe('KorpaComponent', () => {
  let component: KorpaComponent;
  let fixture: ComponentFixture<KorpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorpaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
