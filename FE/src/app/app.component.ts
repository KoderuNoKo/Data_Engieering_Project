import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LogInComponent } from './components/log-in/log-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DoAn';
}
