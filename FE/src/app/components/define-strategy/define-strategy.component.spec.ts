import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineStrategyComponent } from './define-strategy.component';

describe('DefineStrategyComponent', () => {
  let component: DefineStrategyComponent;
  let fixture: ComponentFixture<DefineStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefineStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
