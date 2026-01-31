import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDTO } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly baseUrl = '/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: BookingDTO): Observable<BookingDTO> {
    return this.http.post<BookingDTO>(this.baseUrl, booking);
  }

  getBookingsByUserId(userId: string): Observable<BookingDTO[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<BookingDTO[]>(`${this.baseUrl}/user`, { params });
  }
}
