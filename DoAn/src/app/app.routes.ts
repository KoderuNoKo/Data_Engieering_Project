import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/signup/signup.component';
import { TestUiComponent } from './components/test-ui/test-ui.component';
import { BacktestComponent } from './components/backtest/backtest.component';
import { DefineStrategyComponent } from './components/define-strategy/define-strategy.component'
export const routes: Routes = [
    {path : '', component: LogInComponent},
    {path : 'homepage', component:LandingPageComponent},
    {path : 'signup', component: SignUpComponent},
    {path : 'test', component: TestUiComponent},
    {path : 'backtest', component: BacktestComponent},
    {path : 'strategy', component: DefineStrategyComponent}
];
