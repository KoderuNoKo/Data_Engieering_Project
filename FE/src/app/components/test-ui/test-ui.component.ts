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

  entryStrategyChoice = [
    { value: 'gc', label: 'Golden Cross (MA Crossover)'},
    { value: 'rsi1', label: 'RSI Overbought'},
    { value: 'candle1', label: 'Candlestick Graph Pattern'},
  ];

  entryOptions: { value: string; label: string }[] = [];

  selectedEntryStrategy: 'gc' | 'rsi1' | 'candle1' | '' = '';


  allEntryOptions = {
    gc: {
      options: [
        {value: '1', label: 'Short-term Period'},
        {value: '2', label: 'Long-term Period'}
      ]
    },
    rsi1: {
      options: [
        {value: '1', label: 'Overbought threshold'},
        {value: '2', label: 'Oversold threshold'}
      ]
    },
    candle1: {
      options: [
        {value: '1', label: 'Standard deviation'},
        {value: '2', label: 'MA Period'}
      ]
    }
  }

  onEntryChange() {
    if (this.selectedEntryStrategy && this.allEntryOptions[this.selectedEntryStrategy]) {
      const selectedOption = this.allEntryOptions[this.selectedEntryStrategy];
      this.entryOptions = selectedOption.options
    }
  };

  exitStrategyChoice = [
    { value: 'dc', label: 'Death Cross (MA Crossover)'},
    { value: 'rsi2', label: 'RSI Overbought'},
    { value: 'candle2', label: 'Candlestick Graph Pattern'},
  ];

  exitOptions: { value: string; label: string }[] = [];

  selectedExitStrategy: 'dc' | 'rsi2' | 'candle2' | '' = '';


  allExitOptions = {
    dc: {
      options: [
        {value: '1', label: 'Short-term Period'},
        {value: '2', label: 'Long-term Period'}
      ]
    },
    rsi2: {
      options: [
        {value: '1', label: 'Overbought threshold'},
        {value: '2', label: 'Oversold threshold'}
      ]
    },
    candle2: {
      options: [
        {value: '1', label: 'Standard deviation'},
        {value: '2', label: 'MA Period'}
      ]
    }
  }

  onExitChange() {
    if (this.selectedExitStrategy && this.allExitOptions[this.selectedExitStrategy]) {
      const selectedExitOption = this.allExitOptions[this.selectedExitStrategy];
      this.exitOptions = selectedExitOption.options
    }
  }

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