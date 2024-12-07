import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-ui',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-ui.component.html',
  styleUrls: ['./test-ui.component.css']
})
export class TestUiComponent {
  strategyName: string = '';
  
  entryConditions: StrategyOptions = {
    crossover: '',
    rsi: '',
    candlestick: '',
    additional: ''
  };

  exitConditions: StrategyOptions = {
    crossover: '',
    rsi: '',
    candlestick: '',
    additional: ''
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
    // Implement save logic here
  }
}

interface StrategyOptions {
  crossover: string;
  rsi: string;
  candlestick: string;
  additional: string;
}