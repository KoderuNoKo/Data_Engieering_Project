import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backtest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backtest.component.html',
  styleUrls: ['./backtest.component.css']
})
export class BacktestComponent implements OnInit {
  constructor(private router: Router) {}
  // Market section
  marketSearch: string = '';
  startDate: string = '';
  endDate: string = '';
  
  // Strategy section
  strategySearch: string = '';
  selectedStrategy: any = {
    name: 'My Strategy',
    entryCondition: 'Golden Cross (MA Crossover)',
    shortPeriod: 20,
    longPeriod: 50,
    stopLoss: 1,
    deathCross: 1
  };

  // Calendar data
  currentMonth: Date = new Date();
  calendarDays: Date[] = [];
  weekDays: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.calendarDays = [];
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      this.calendarDays.push(new Date(date));
    }
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendarDays();
  }

  selectDate(date: Date) {
    // Implement date selection logic
    console.log('Selected date:', date);
  }

  searchMarket() {
    console.log('Searching market:', this.marketSearch);
  }

  searchStrategy() {
    console.log('Searching strategy:', this.strategySearch);
  }

  runTest() {
    console.log('Running backtest with configuration:', {
      market: this.marketSearch,
      dateRange: { start: this.startDate, end: this.endDate },
      strategy: this.selectedStrategy
    });
  }

  startForwardTest() {
    console.log('Starting forward test');
  }

  toLandingPage() {
    this.router.navigate(['/homepage'])
  }

  toTest() {
    this.router.navigate(['/test'])
  }

  toBackTest(){
    this.router.navigate(['/backtest'])
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
}