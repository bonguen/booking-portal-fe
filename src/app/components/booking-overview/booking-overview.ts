import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { BookingService } from '../../services/booking.service';
import { BookingDTO } from '../../models/booking.model';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-booking-overview',
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
  ],
  templateUrl: './booking-overview.html',
  styleUrl: './booking-overview.scss',
})
export class BookingOverview implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'customerName',
    'startDate',
    'endDate',
    'status',
    'price',
  ];
  dataSource: MatTableDataSource<BookingDTO> =
    new MatTableDataSource<BookingDTO>([]);
  public bookings$: Observable<BookingDTO[]> = new Observable<BookingDTO[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookings$ = this.bookingService
      .getBookingsByUserId('microsoft-user-id-12345')
      .pipe(
        tap((data: BookingDTO[]) => {
          this.dataSource.data = data;
        }),
      );

    // Optional: filter combines multiple fields - more fields can be added as needed
    this.dataSource.filterPredicate = (data: BookingDTO, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        (data.customerName ?? '').toLowerCase().includes(term) ||
        (data.status ?? '').toLowerCase().includes(term) ||
        (data.currency ?? '').toLowerCase().includes(term) ||
        String(data.id).includes(term)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
