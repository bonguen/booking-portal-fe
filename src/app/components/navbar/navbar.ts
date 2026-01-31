import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { Observable } from 'rxjs';

export const NAVBAR_LINKS: {
  path: string;
  label: string;
  fragment?: string;
}[] = [
  { path: '/home', label: 'HOME', fragment: 'home' },
  { path: '/bookings', label: 'BOOKINGS', fragment: 'bookings' },
  {
    path: '/booking-details',
    label: 'BOOKING_DETAILS',
    fragment: 'booking_details',
  },
  {
    path: '/booking-creation',
    label: 'BOOKING_CREATION',
    fragment: 'booking_creation',
  },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  sidebarActive: Observable<boolean>;
  links: typeof NAVBAR_LINKS = NAVBAR_LINKS;
  languages: { code: string; name: string; flag: string }[] = [
    {
      code: 'en',
      name: 'English',
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/gb.svg',
    },
    {
      code: 'de',
      name: 'Deutsch',
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/de.svg',
    },
  ];
  selectedLanguage = this.languages[1];

  constructor(
    private translateService: TranslateService,
    private sidebarService: SidebarService,
  ) {
    this.sidebarActive = this.sidebarService.sidebarActive$;
  }

  /**
   * Displays the hamburger icon if the screen is smaller then 768px.
   * toogles the sidebar after clicking this hamburger icon.
   */
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  switchLanguage(language: string) {
    this.selectedLanguage = this.languages.find(
      (lang: { code: string }) => lang.code === language,
    ) || this.selectedLanguage;
    this.translateService.use(language);
  }
}
