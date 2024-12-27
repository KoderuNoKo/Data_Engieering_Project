import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacktestComponent } from './backtest.component';
import { FormsModule } from '@angular/forms';

describe('BacktestComponent', () => {
  let component: BacktestComponent;
  let fixture: ComponentFixture<BacktestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacktestComponent, FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BacktestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate calendar days', () => {
    component.generateCalendarDays();
    expect(component.calendarDays.length).toBeGreaterThan(0);
  });

  it('should navigate to previous month', () => {
    const initialMonth = component.currentMonth.getMonth();
    component.previousMonth();
    expect(component.currentMonth.getMonth()).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
  });

  it('should navigate to next month', () => {
    const initialMonth = component.currentMonth.getMonth();
    component.nextMonth();
    expect(component.currentMonth.getMonth()).toBe(initialMonth === 11 ? 0 : initialMonth + 1);
  });

  it('should identify today correctly', () => {
    const today = new Date();
    expect(component.isToday(today)).toBe(true);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(component.isToday(tomorrow)).toBe(false);
  });
});