import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { BookingOverview } from './components/booking-overview/booking-overview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, BookingOverview],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('booking-portal-fe');
}
