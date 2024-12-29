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
    { value: 'candle1', label: 'Price hit Bollinger Band'},
  ];

  firstEntryLabel = '';
  secondEntryLabel = '';
  firstExitLabel = '';
  secondExitLabel = '';

  selectedEntryStrategy: 'gc' | 'rsi1' | 'candle1' | '' = '';


  allEntryOptions = {
    gc: {
      firstEntryLabel: 'Short-term Period',
      secondEntryLabel: 'Long-term Period'
    },
    rsi1: {
      firstEntryLabel: 'Overbought threshold',
      secondEntryLabel: 'Oversold threshold'
    },
    candle1: {
      firstEntryLabel: 'Standard deviation',
      secondEntryLabel: 'MA Period'
    }
  }

  onEntryChange() {
    if (this.selectedEntryStrategy && this.allEntryOptions[this.selectedEntryStrategy]) {
      const selectedOption = this.allEntryOptions[this.selectedEntryStrategy];
      this.firstEntryLabel = selectedOption.firstEntryLabel;
      this.secondEntryLabel = selectedOption.secondEntryLabel;
    }
  };

  exitStrategyChoice = [
    { value: 'dc', label: 'Death Cross (MA Crossover)'},
    { value: 'rsi2', label: 'RSI Overbought'},
    { value: 'candle2', label: 'Price hit Bollinger Band'},
  ];

  selectedExitStrategy: 'dc' | 'rsi2' | 'candle2' | '' = '';


  allExitOptions = {
    dc: {
      firstExitLabel: 'Short-term Period',
      secondExitLabel: 'Long-term Period'
    },
    rsi2: {
      firstExitLabel: 'Overbought threshold',
      secondExitLabel: 'Oversold threshold'
    },
    candle2: {
      firstExitLabel: 'Standard deviation',
      secondExitLabel: 'MA Period'
    }
  };

  onExitChange() {
    if (this.selectedExitStrategy && this.allExitOptions[this.selectedExitStrategy]) {
      const selectedExitOption = this.allExitOptions[this.selectedExitStrategy];
      this.firstExitLabel = selectedExitOption.firstExitLabel;
      this.secondExitLabel = selectedExitOption.secondExitLabel;
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