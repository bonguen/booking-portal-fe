import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BookingOverview } from './components/booking-overview/booking-overview';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'bookings-overview',
    component: BookingOverview,
  },
];
