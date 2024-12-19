import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test-ui',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-ui.component.html',
  styleUrls: ['./test-ui.component.css']
})
export class TestUiComponent {
  constructor(private router: Router) {}
  strategyName: string = '';
  
  entryConditions: StrategyOptions = {
    sizePercent: null as number | null,
    stopLoss: null as number | null,
    takeProfit: null as number | null,
    position: '',
    sma: '',
    ema: '',
    rsi: '',
    priceHit: ''
  };

  exitConditions: StrategyOptions = {
    sizePercent: null as number | null,
    stopLoss: null as number | null,
    takeProfit: null as number | null,
    position: '',
    sma: '',
    ema: '',
    rsi: '',
    priceHit: ''
  };

  periods = {
    entryShort: null as number | null,
    entryLong: null as number | null,
    exitShort: null as number | null,
    exitLong: null as number | null
  };

  riskManagement = {
    stopLoss: null as number | null,
    risk: null as number | null,
    option1: '',
    option2: ''
  };

  saveStrategy() {
    console.log('Saving strategy:', this.strategyName);
    window.alert('Save successfully!');
    // Implement save logic here
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
}

interface StrategyOptions {
  sizePercent: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  position: string;
  sma: string;
  ema: string;
  rsi: string;
  priceHit: string;
}