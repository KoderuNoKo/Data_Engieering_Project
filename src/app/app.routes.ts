import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/signup/signup.component';
export const routes: Routes = [
    {path : '', component: LogInComponent},
    {path : 'homepage', component:LandingPageComponent},
    {path : 'signup', component: SignUpComponent}
];
